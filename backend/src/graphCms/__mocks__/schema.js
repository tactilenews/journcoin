import { loadSchema } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { join } from 'path';

export default async () => loadSchema(join(__dirname, '../schema.gql'), {
  loaders: [
    new GraphQLFileLoader(),
  ],
});
