import mercurius from 'mercurius'
import { loadSchemaFiles, codegenMercurius } from "mercurius-codegen";
import {app} from '../app';

import { FastifyRequest, FastifyReply } from 'fastify'

import { resolvers } from "../graphql";
import { buildSchema } from 'graphql';

const buildContext = async (req: FastifyRequest, _reply: FastifyReply) => {
    return {
      authorization: req.headers.authorization,
    }
}

const { schema } = loadSchemaFiles("src/graphql/schema.gql", {
    watchOptions: {
        onChange(schema) {
            app.graphql.replaceSchema(buildSchema(schema.join('\n')));
            app.graphql.defineResolvers(resolvers);

            codegenMercurius(app, {
                targetPath: './src/graphql/generated.ts',
            }).catch(console.error);
        }
    }
});

app.register(mercurius, {
    schema: schema,
    resolvers: resolvers,
    context: buildContext,
    subscription: true,
    graphiql: true
})
  
type PromiseType<T> = T extends PromiseLike<infer U> ? U : T
  
declare module 'mercurius' {
    interface MercuriusContext
        extends PromiseType<ReturnType<typeof buildContext>> {}
}
  

codegenMercurius(app, {
    targetPath: './src/graphql/generated.ts'
}).catch(console.error);
