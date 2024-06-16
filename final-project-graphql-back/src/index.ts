import server from './server';

// Lancer le serveur
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
