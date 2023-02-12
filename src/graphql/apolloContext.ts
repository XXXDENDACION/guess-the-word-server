import type { PrismaClient } from '@prisma/client';
import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import type { ApolloFastifyContextFunction } from '@as-integrations/fastify';
import type { PubSub } from 'graphql-subscriptions';

export interface ApolloContext {
    authorization?: string;
    request: FastifyRequest;
    reply: FastifyReply;
    prisma: PrismaClient;
    pubSub: PubSub;
    app: FastifyInstance;
}

export const setApolloContext = (server: FastifyInstance, pubSub: PubSub) => {
    const apolloContextFunction: ApolloFastifyContextFunction<
        ApolloContext
    > = async (request: FastifyRequest, reply: FastifyReply) => ({
        request,
        reply,
        pubSub,
        prisma: server.prisma,
        app: server,
        authorization: request.headers?.authorization,
    });

    return apolloContextFunction;
};
