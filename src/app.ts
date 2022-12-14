import path from 'path';
import * as dotenv from 'dotenv';
import type { FastifyInstance } from 'fastify';
import fastify from 'fastify';
import AutoLoad from '@fastify/autoload';
import cors from '@fastify/cors';

import type { IncomingMessage, Server, ServerResponse } from 'http';

dotenv.config();

export const app: FastifyInstance<Server, IncomingMessage, ServerResponse> =
    fastify({ logger: true });

app.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
});

app.register(cors, {});

app.get('/ping', async () => 'pong\n');

app.get('/', async () => 'Hello');

app.listen({ port: 8080 }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`app listening at ${address}`);
});
