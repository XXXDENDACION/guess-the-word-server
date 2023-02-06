import type { FastifyPluginCallback } from 'fastify';
import type { BaseContext } from '@apollo/server';
import { ApolloServer } from '@apollo/server';
import fastifyApollo, {
    ApolloFastifyContextFunction,
    fastifyApolloDrainPlugin,
} from '@as-integrations/fastify';
import { readFileSync } from 'fs';

import fp from 'fastify-plugin';
import type { Resolvers } from '../__generated__/resolvers-types';
import { resolvers as baseResolvers } from '../graphql';

// interface MyContext {
//     authorization: FastifyJWT;
// }
//
// const myContextFunction: ApolloFastifyContextFunction<MyContext> = async (request, reply) => ({
//     authorization:
// })

const resolvers: Resolvers = {
    Query: {
        ...baseResolvers.Query,
    },
};

const apolloPlugin: FastifyPluginCallback = async (fastify, _, done) => {
    const typeDefs = readFileSync('./src/graphql/schema.gql', {
        encoding: 'utf-8',
    });

    const apollo = new ApolloServer<BaseContext>({
        typeDefs,
        resolvers,
        plugins: [fastifyApolloDrainPlugin(fastify)],
    });

    await apollo.start();

    await fastify.register(fastifyApollo(apollo));

    done();
};

export default fp(apolloPlugin);
