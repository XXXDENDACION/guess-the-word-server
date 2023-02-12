import '@fastify/jwt';

declare module '@fastify/jwt' {
    export interface FastifyJWT {
        id: number;
        username: string;
        role: string;
        password: string;
    }
}
