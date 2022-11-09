import fp from 'fastify-plugin';
import { FastifyPluginCallback, FastifyReply, FastifyRequest } from 'fastify';
import { FastifyJWT } from '@fastify/jwt';

import mercurius from 'mercurius';
import { codegenMercurius, loadSchemaFiles } from 'mercurius-codegen';
import mercuriusAuth from 'mercurius-auth';

import { PrismaClient } from '@prisma/client';

import { buildSchema } from 'graphql/index';
import { resolvers } from '../graphql';

type ContextMercurius = {
    prisma: PrismaClient
    request: FastifyRequest,
    reply: FastifyReply,
    authorization?: string
}

const mercuriusPlugin: FastifyPluginCallback = (server, opts, done) => {
    const buildContext = async (request: FastifyRequest, reply: FastifyReply): Promise<ContextMercurius> => ({
        authorization: request.headers.authorization,
        prisma: server.prisma,
        request,
        reply,
    });

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
        context: buildContext,
        subscription: true,
        graphiql: true,
    });

    server.register(mercuriusAuth, {
        authContext(context) {
            return { identity: context.reply.request.headers['x-user'] };
        },
        async applyPolicy(authDirectiveAST, parent, args, context) {
            const token = context?.auth?.identity;
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
