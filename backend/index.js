import Server from './src/server';

(async () => {
  const server = await Server();
  const { url } = await server.listen();
  console.log(`🚀  Server ready at ${url}`);
  process.on('SIGINT', () => {
    console.log('\nGracefully shutting down from SIGINT (Ctrl-C)');
    // some other closing procedures go here
    process.exit(1);
  });
})();
