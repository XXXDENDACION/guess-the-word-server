import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { PrismaClient } from '@prisma/client'

type ContextMercurius = {
    prisma: PrismaClient
    request: FastifyRequest
    reply: FastifyReply
    authorization?: string
}

export const buildContext = async (
    request: FastifyRequest,
    reply: FastifyReply,
    server: FastifyInstance
): Promise<ContextMercurius> => ({
    authorization: request.headers.authorization,
    prisma: server.prisma,
    request,
    reply,
})
