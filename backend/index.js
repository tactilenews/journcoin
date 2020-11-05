// import { serverHotReload } from 'universal-hot-reload';
import { ApolloServer } from 'apollo-server';
import setupServer from './src/server';

(async () => {
  const server = await setupServer(ApolloServer);
  // The `listen` method launches a web server.
  const { url } = await server.listen();
  console.log(`🚀  Server ready at ${url}`);

  process.on('SIGINT', () => {
    console.log('\nGracefully shutting down from SIGINT (Ctrl-C)');
    // some other closing procedures go here
    process.exit(1);
  });
  // serverHotReload(server.httpServer);
})();
