import { ApolloServer } from 'apollo-server-lambda';
import Server from './src/server';

const playground = {
  endpoint: '/dev/graphql',
};
const createHandler = async () => {
  const server = await Server(ApolloServer, { playground });
  return server.createHandler({
    cors: {
      origin: true,
      credentials: true,
    },
  });
};

// eslint-disable-next-line import/prefer-default-export
export const graphqlHandler = (event, context, callback) => {
  createHandler().then((handler) => handler(event, context, callback));
};
