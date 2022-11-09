import "@fastify/jwt";

declare module "@fastify/jwt" {
  export interface FastifyJWT {
    username: string;
    role: string;
    password: string;
  }
}