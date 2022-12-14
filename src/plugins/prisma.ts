import fp from 'fastify-plugin';
import type { FastifyPluginAsync } from 'fastify';
import { PrismaClient } from '@prisma/client';

const prismaPlugin: FastifyPluginAsync = fp(async (server) => {
    const prisma = new PrismaClient({
        log: ['error', 'warn'],
    });

    await prisma.$connect();

    server.decorate('prisma', prisma);

    server.addHook('onClose', async (fastify) => {
        fastify.log.info('disconnection Prisma from DB');
        await server.prisma.$disconnect();
    });
});

export default prismaPlugin;
