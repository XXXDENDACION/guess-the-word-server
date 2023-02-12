import type { Context, SubscribeMessage } from 'graphql-ws';
import type { ExecutionArgs } from 'graphql/execution';
import type { PubSub } from 'graphql-subscriptions';
import type { FastifyInstance } from 'fastify';
import type { FastifyJWT } from '@fastify/jwt';

export interface ApolloSubscriptionContext {
    pubSub: PubSub;
    currentUser: FastifyJWT | null;
}

export const apolloSubscriptionContext = async (
    ctx: Context,
    msg: SubscribeMessage,
    args: ExecutionArgs,
    pubSub: PubSub,
    server: FastifyInstance
): Promise<ApolloSubscriptionContext> => {
    const token = ctx.connectionParams?.Authorization as string;
    if (!token) {
        return {
            pubSub,
            currentUser: null,
        };
    }

    const currentUser = server.jwt.decode(token) as FastifyJWT;
    if (!currentUser) {
        return {
            pubSub,
            currentUser: null,
        };
    }

    return {
        currentUser,
        pubSub,
    };
};
