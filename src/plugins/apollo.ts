import { ApolloServer } from '@apollo/server';
import fastifyApollo, {
    fastifyApolloDrainPlugin,
} from '@as-integrations/fastify';
import { readFileSync } from 'fs';
import fp from 'fastify-plugin';

import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { PubSub } from 'graphql-subscriptions';
import { makeExecutableSchema } from '@graphql-tools/schema';

import { setApolloContext } from '../graphql/apolloContext';

import { resolvers as baseResolvers } from '../graphql';
import { userResolvers } from '../modules/user';
import { gameResolvers } from '../modules/game';

import type { FastifyPluginCallback } from 'fastify';
import type { ApolloContext } from '../graphql/apolloContext';
import type { Resolvers } from '../__generated__/resolvers-types';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { apolloSubscriptionContext } from '../graphql/apolloSubscriptionContext';

const resolvers: Resolvers = {
    Query: {
        ...baseResolvers.Query,
        ...userResolvers.Query,
        ...gameResolvers.Query,
    },
    Mutation: {
        ...userResolvers.Mutation,
        ...gameResolvers.Mutation,
    },
    Subscription: {
        ...gameResolvers.Subscription,
    },
};

const apolloPlugin: FastifyPluginCallback = async (fastify, _, done) => {
    const typeDefs = readFileSync('./src/graphql/schema.gql', {
        encoding: 'utf-8',
    });

    const schema = makeExecutableSchema({ typeDefs, resolvers });

    const apollo = new ApolloServer<ApolloContext>({
        schema,
        plugins: [
            // no support subscriptions in @as-integrations/fastify ????
            // https://github.com/apollo-server-integrations/apollo-server-integration-fastify/issues/124
            fastifyApolloDrainPlugin(fastify),
            ApolloServerPluginDrainHttpServer({ httpServer: fastify.server }),
            {
                async serverWillStart() {
                    return {
                        async drainServer() {
                            await serverCleanup.dispose();
                        },
                    };
                },
            },
        ],
    });

    const wsServer = new WebSocketServer({
        server: fastify.server,
        path: '/graphql',
    });

    const pubSub = new PubSub();

    const serverCleanup = useServer(
        {
            schema,
            context: async (ctx, msg, args) => {
                return apolloSubscriptionContext(
                    ctx,
                    msg,
                    args,
                    pubSub,
                    fastify
                );
            },
        },
        wsServer
    );

    await apollo.start();

    await fastify.register(fastifyApollo(apollo), {
        context: setApolloContext(fastify, pubSub),
    });

    done();
};

export default fp(apolloPlugin);
