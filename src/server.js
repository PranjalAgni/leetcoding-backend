const config = require('./config/');
const initalizeApp = require('./app');

const startServer = async () => {
  const fastify = initalizeApp({ logger: true });
  fastify.listen(config.port, (err, address) => {
    if (err) {
      fastify.log.error(err);
      process.exit(1);
    }

    console.log(`Server running on http://localhost:${config.port}`);
  });
};

startServer();
