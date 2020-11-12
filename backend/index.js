import { ApolloServer } from 'apollo-server';
import Server from './src/server';

const playground = {
  settings: {
    'schema.polling.enable': false,
  },
};

(async () => {
  const server = await Server(ApolloServer, { playground });
  const { url } = await server.listen();
  console.log(`🚀  Server ready at ${url}`);
  process.on('SIGINT', () => {
    console.log('\nGracefully shutting down from SIGINT (Ctrl-C)');
    // some other closing procedures go here
    process.exit(1);
  });
})();
