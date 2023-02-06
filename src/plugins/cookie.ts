import fp from 'fastify-plugin';
import type { FastifyPluginCallback } from 'fastify';
import type { FastifyCookieOptions } from '@fastify/cookie';

const fastifyCookie: FastifyPluginCallback = async (fastify) => {
    fastify.register(import('@fastify/cookie'), {
        secret: 'secret-cookie',
    } as FastifyCookieOptions);
};

export default fp(fastifyCookie);
