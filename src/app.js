const Fastify = require('fastify');
const connectDB = require('./db/');
const registerAPI = require('./routes/');

const initalizeApp = (opts = {}) => {
  connectDB();
  const fastify = Fastify(opts);

  fastify.register(registerAPI);

  return fastify;
};

module.exports = initalizeApp;
