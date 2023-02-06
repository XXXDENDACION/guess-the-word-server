import fp from 'fastify-plugin';
import type { FastifyPluginCallback } from 'fastify';

import type { IResolvers } from 'mercurius';
import mercurius from 'mercurius';
import { codegenMercurius, loadSchemaFiles } from 'mercurius-codegen';
import mercuriusAuth from 'mercurius-auth';

import { buildSchema } from 'graphql';
import { resolvers as baseResolvers } from '../graphql';
import { buildContext } from '../graphql/mercuriusContext';

import { userResolvers } from '../modules/user';
import { gameResolvers } from '../modules/game';

const resolvers: IResolvers = {
    Query: {
        ...baseResolvers.Query,
        ...userResolvers.Query,
        ...gameResolvers.Query,
    },
    Mutation: {
        ...baseResolvers.Mutation,
        ...userResolvers.Mutation,
        ...gameResolvers.Mutation,
    },
    Subscription: {
        ...gameResolvers.Subscription,
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
        subscription: {
            context: (_, req) => {
                console.log('@@@@@', req.headers['Authorization']);
                return { user: req.headers['Authorization'] };
            },
        },
        graphiql: true,
    });

    server.register(mercuriusAuth, {
        async authContext(context) {
            return { identity: context.reply.request.headers['x-user'] };
        },
        async applyPolicy(authDirectiveAST, parent, args, context) {
            try {
                const token = await context.request.jwtVerify();
                return !!token;
            } catch (err) {
                if (err instanceof Error) {
                    throw new Error(err.message);
                }
                throw new Error('Internal Error');
            }
        },
        authDirective: 'auth',
    });

    codegenMercurius(server, {
        targetPath: './src/graphql/generated.ts',
    }).catch(console.error);

    done();
};

// export default fp(mercuriusPlugin);
