import { loadSchema } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';

export default async () => loadSchema('src/graphCms/__mocks__/schema.gql', {
  loaders: [
    new GraphQLFileLoader(),
  ],
});
