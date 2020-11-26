import { ApolloServer } from 'apollo-server-lambda';
import jwt from 'jsonwebtoken';
import Server from './src/server';
import { JWT_SECRET } from './src/config';

const playground = {
  settings: {
    'schema.polling.enable': false,
  },
  endpoint: '/dev/graphql',
};
const createHandler = async ({ event }) => {
  const { Authorization, authorization } = event.headers;
  let token = Authorization || authorization || '';
  token = token.replace('Bearer ', '');
  let context;
  try {
    context = jwt.verify(token, JWT_SECRET);
  } catch (e) {
    context = {};
  }
  const server = await Server(ApolloServer, { context, playground, introspection: true });

  return server.createHandler({
    cors: {
      origin: true,
      credentials: true,
    },
  });
};

// eslint-disable-next-line import/prefer-default-export
export const graphqlHandler = (event, context, callback) => {
  createHandler({ event }).then((handler) => handler(event, context, callback));
};
