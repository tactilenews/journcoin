import { ApolloServer } from 'apollo-server';
import Schema from './schema';

const playground = {
  settings: {
    'schema.polling.enable': false,
  },
};

export default async () => {
  const schema = await Schema();
  const server = new ApolloServer({ schema, playground });
  return server;
};
