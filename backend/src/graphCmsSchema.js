import { fetch } from 'cross-fetch';
import { wrapSchema } from '@graphql-tools/wrap';
import { print } from 'graphql';
import { loadSchema } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { GRAPH_CMS_API_TOKEN, GRAPH_CMS_ENDPOINT } from './config';

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
  const schema = await loadSchema('src/graphCmsSchema.gql', {
    loaders: [
      new GraphQLFileLoader(),
    ],
  });
  return wrapSchema({
    schema,
    executor,
  });
};
