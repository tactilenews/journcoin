import { ApolloServer } from 'apollo-server-lambda';
import setupServer from './src/server';

// eslint-disable-next-line import/prefer-default-export
export async function graphqlHandler() {
  const server = await setupServer(ApolloServer);
  return server.createHandler({
    cors: {
      origin: true,
      credentials: true,
    },
  });
}
