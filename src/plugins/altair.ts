import fp from 'fastify-plugin';
import AltairFastify from 'altair-fastify-plugin';
import type { FastifyPluginCallback } from 'fastify';

const altairPlugin: FastifyPluginCallback = (fastify, opts, done) => {
    fastify.register(AltairFastify, {
        path: '/altair',
        baseURL: '/altair/',
        endpointURL: '/graphql',
    });
    done();
};

export default fp(altairPlugin);
