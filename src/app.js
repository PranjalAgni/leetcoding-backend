const Fastify = require('fastify');
const connectDB = require('./db/');
const intializeRoutes = require('./routes/');

const initalizeApp = (opts = {}) => {
  connectDB();
  const fastify = Fastify(opts);

  fastify.register(intializeRoutes);

  return fastify;
};

module.exports = initalizeApp;
