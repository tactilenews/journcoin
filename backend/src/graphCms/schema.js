import { fetch } from 'cross-fetch';
import { introspectSchema, wrapSchema } from '@graphql-tools/wrap';
import { print } from 'graphql';
import { GRAPH_CMS_API_TOKEN, GRAPH_CMS_ENDPOINT } from '../config';

export const executor = async ({ document, variables }) => {
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

export default async () => wrapSchema({
  schema: await introspectSchema(executor),
  executor,
});
