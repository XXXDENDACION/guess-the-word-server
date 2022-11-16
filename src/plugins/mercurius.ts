import fp from 'fastify-plugin';
import { FastifyPluginCallback } from 'fastify';
import { FastifyJWT } from '@fastify/jwt';

import mercurius, { IResolvers } from 'mercurius';
import { codegenMercurius, loadSchemaFiles } from 'mercurius-codegen';
import mercuriusAuth from 'mercurius-auth';

import { buildSchema } from 'graphql';
import { resolvers as baseResolvers } from '../graphql';
import { buildContext } from '../graphql/mercuriusContext';

import { userResolvers } from '../modules/user';

const resolvers: IResolvers = {
    Query: {
        ...baseResolvers.Query,
        ...userResolvers.Query,
    },
    Mutation: {
        ...baseResolvers.Mutation,
        ...userResolvers.Mutation,
    },
};

const mercuriusPlugin: FastifyPluginCallback = (server, opts, done) => {
    const { schema } = loadSchemaFiles('src/graphql/schema.gql', {
        watchOptions: {
            onChange() {
                server.graphql.replaceSchema(buildSchema(schema.join('\n')));
                server.graphql.defineResolvers(resolvers);

                codegenMercurius(server, {
                    targetPath: './src/graphql/generated.ts',
                }).catch(console.error);
            },
        },
    });

    server.register(mercurius, {
        schema,
        resolvers,
        context: (request, reply) => buildContext(request, reply, server),
        subscription: true,
        graphiql: true,
    });

    server.register(mercuriusAuth, {
        authContext(context) {
            return { identity: context.reply.request.headers['x-user'] };
        },
        async applyPolicy(authDirectiveAST, parent, args, context) {
            const token = <string>context?.auth?.identity;
            try {
                const claim = server.jwt.verify<FastifyJWT>(token);
                return claim?.role === 'admin';
            } catch (err) {
                throw new Error('Error!');
            }
        },
        authDirective: 'auth',
    });

    codegenMercurius(server, {
        targetPath: './src/graphql/generated.ts',
    }).catch(console.error);

    done();
};

export default fp(mercuriusPlugin);
