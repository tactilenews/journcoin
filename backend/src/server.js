import setupSchema from './schema';

const playground = {
  settings: {
    'schema.polling.enable': false,
  },
};

export default async function setupServer(ApolloServer) {
  const schema = await setupSchema();
  const server = new ApolloServer({ schema, playground });
  return server;
}
