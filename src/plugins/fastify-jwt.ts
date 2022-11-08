import { FastifyPluginCallback, FastifyReply, FastifyRequest } from "fastify";
import fp from "fastify-plugin";

import * as dotenv from "dotenv";

dotenv.config();

const fastifyJwt: FastifyPluginCallback = async (fastify, opts) => {
  fastify.register(import("@fastify/jwt"), {
    secret: process.env.JWT_SECRET || ''
  })

  fastify.decorate("authenticate", async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      await req.jwtVerify();
    } catch (e) {
      return reply.send(e);
    }
  })
}

export default fp(fastifyJwt);