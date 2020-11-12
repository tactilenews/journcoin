import Schema from './schema';

export default async (ApolloServer, opts) => {
  const schema = await Schema();
  const server = new ApolloServer({ schema, ...opts });
  return server;
};
