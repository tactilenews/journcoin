import { gql } from 'apollo-server';
import { wrapSchema, introspectSchema } from '@graphql-tools/wrap';
import { print } from 'graphql';
import { fetch } from 'cross-fetch';
import { stitchSchemas } from '@graphql-tools/stitch';
import { delegateToSchema } from '@graphql-tools/delegate';
import { GRAPH_CMS_ENDPOINT, GRAPH_CMS_API_TOKEN } from './config';

const executor = async ({ document, variables }) => {
  const query = print(document);
  const fetchResult = await fetch(GRAPH_CMS_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${GRAPH_CMS_API_TOKEN}`,
    },
    body: JSON.stringify({ query, variables }),
  });
  return fetchResult.json();
};

const typeDefs = gql`
  type Mutation {
    earn(token: String!): JournCoin
  }
`;
export default async () => {
  const graphCmsSchema = wrapSchema({
    schema: await introspectSchema(executor),
    executor,
  });
  return stitchSchemas({
    subschemas: [
      graphCmsSchema,
    ],
    typeDefs,
    resolvers: {
      Mutation: {
        earn: {
          selectionSet: '{ id token }',
          resolve(parent, args, context, info) {
            return delegateToSchema({
              schema: graphCmsSchema,
              operation: 'mutation',
              fieldName: 'createJournCoin',
              args: {
                data: { ...args },
              },
              context,
              info,
            });
          },
        },
      },
    },
  });
};
