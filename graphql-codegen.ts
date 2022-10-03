import path from "path";
import fastify from "fastify";
import mercurius from "mercurius";
import { codegenMercurius, loadSchemaFiles } from "mercurius-codegen";

const app = fastify();

function generateGqlTypes() {
  codegenMercurius(app, {
    targetPath: path.resolve(__dirname, "./src/graphql/generated.ts")
  }).catch(console.error);
}

const { schema } = loadSchemaFiles(path.resolve(__dirname, "./src/graphql/schema.gql"));

app.register(mercurius, { schema });
generateGqlTypes();
