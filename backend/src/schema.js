import { makeExecutableSchema } from '@graphql-tools/schema';
import { stitchSchemas } from '@graphql-tools/stitch';
import { applyMiddleware } from 'graphql-middleware';
import typeDefs from './typeDefs';
import resolvers from './resolvers';
import permissions from './permissions';
import GraphCmsSchema from './graphCms/schema';

export default async () => {
  const graphCmsSchema = await GraphCmsSchema();

  const customSchema = makeExecutableSchema({ typeDefs, resolvers });

  let gatewaySchema = stitchSchemas({
    subschemas: [
      graphCmsSchema,
      customSchema,
    ],
  });
  gatewaySchema = applyMiddleware(gatewaySchema, permissions);
  return gatewaySchema;
};
