import { IncomingMessage, Server, ServerResponse } from 'http';
import path from 'path';
import * as dotenv from 'dotenv';
import fastify, { FastifyInstance } from 'fastify';
import AutoLoad from '@fastify/autoload';

dotenv.config();

export const app: FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify(
    { logger: true },
);

app.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
});

app.get('/ping', async (request, reply) => 'pong\n');

app.get('/', async (request, reply) => 'Hello');

app.listen({ port: 8080 }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`app listening at ${address}`);
});
