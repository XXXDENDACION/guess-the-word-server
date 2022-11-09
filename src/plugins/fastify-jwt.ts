import { FastifyPluginCallback, FastifyReply, FastifyRequest } from 'fastify';
import fp from 'fastify-plugin';

const fastifyJwt: FastifyPluginCallback = async (fastify) => {
    fastify.register(import('@fastify/jwt'), {
        secret: process.env.JWT_SECRET || '',
    });
    const a =  "2";
    console.log(a);
    fastify.decorate('authenticate', async (req: FastifyRequest, reply: FastifyReply) => {
        try {
            return await req.jwtVerify();
        } catch (e) {
            return reply.send(e);
        }
    });
};

export default fp(fastifyJwt);
