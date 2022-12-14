import type { FastifyPluginCallback } from 'fastify';
import fp from 'fastify-plugin';

const fastifyJwt: FastifyPluginCallback = async (fastify) => {
    fastify.register(import('@fastify/jwt'), {
        secret: process.env.JWT_REFRESH_SECRET || '',
        messages: {
            authorizationTokenExpiredMessage: 'Token is Expired!',
            authorizationTokenInvalid: 'Token is Invalid!',
        },
    });
};

export default fp(fastifyJwt);
