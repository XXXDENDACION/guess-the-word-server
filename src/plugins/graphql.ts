import { PrismaClient } from "@prisma/client";
import { FastifyJWT } from "@fastify/jwt";
import mercurius from "mercurius";
import { loadSchemaFiles, codegenMercurius } from "mercurius-codegen";
import mercuriusAuth from "mercurius-auth";

import { app } from "../app";

import { FastifyRequest, FastifyReply } from "fastify";
import { resolvers } from "../graphql";
import { buildSchema } from "graphql";

const buildContext = async (req: FastifyRequest, _reply: FastifyReply) => {
  return {
    authorization: req.headers.authorization,
    prisma: app.prisma
  };
};

const { schema } = loadSchemaFiles("src/graphql/schema.gql", {
  watchOptions: {
    onChange(schema) {
      app.graphql.replaceSchema(buildSchema(schema.join("\n")));
      app.graphql.defineResolvers(resolvers);

      codegenMercurius(app, {
        targetPath: "./src/graphql/generated.ts",
      }).catch(console.error);
    },
  },
});

app.register(mercurius, {
  schema: schema,
  resolvers: resolvers,
  context: buildContext,
  subscription: true,
  graphiql: true,
});

app.register(mercuriusAuth, {
  authContext(context) {
    return { identity: context.reply.request.headers["x-user"] };
  },
  async applyPolicy(authDirectiveAST, parent, args, context, info) {
    const token = context?.auth?.identity;
    try {
      const claim = app.jwt.verify<FastifyJWT>(token);
      return claim?.role === "admin";
    } catch (err) {
      throw new Error("Error!");
    }
  },
  authDirective: "auth",
});

codegenMercurius(app, {
  targetPath: "./src/graphql/generated.ts",
}).catch(console.error);

type PromiseType<T> = T extends PromiseLike<infer U> ? U : T;

declare module "mercurius" {
  interface MercuriusContext
    extends PromiseType<ReturnType<typeof buildContext>> {}
}

declare module "fastify" {
  interface FastifyInstance {
    prisma: PrismaClient
  }
}