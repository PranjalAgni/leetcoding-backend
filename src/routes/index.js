const initalizeRoutes = (fastify, _opts, done) => {
  fastify.get('/', function (_request, reply) {
    reply.send({ hello: '🚀' });
  });

  fastify.register(require('./problems'), { prefix: '/problems' });
  fastify.register(require('./tags'), { prefix: '/tags' });

  done();
};

module.exports = initalizeRoutes;
