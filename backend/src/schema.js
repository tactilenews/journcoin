import { fetch } from 'cross-fetch';
import { print } from 'graphql';
import { wrapSchema, introspectSchema } from '@graphql-tools/wrap';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { stitchSchemas } from '@graphql-tools/stitch';
import { applyMiddleware } from 'graphql-middleware';
import typeDefs from './typeDefs';
import resolvers from './resolvers';
import { GRAPH_CMS_API_TOKEN, GRAPH_CMS_ENDPOINT } from './config';
import permissions from './permissions';

const executor = async ({ document, variables }) => {
  const query = print(document);
  const fetchResult = await fetch(GRAPH_CMS_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${GRAPH_CMS_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
  });
  return fetchResult.json();
};

export default async () => {
  const graphCmsSchema = wrapSchema({
    schema: await introspectSchema(executor),
    executor,
  });

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
