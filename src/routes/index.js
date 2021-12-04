const initalizeRoutes = (fastify, _, done) => {
  fastify.get('/', function (_request, reply) {
    reply.send({ hello: '🚀' });
  });

  done();
};

module.exports = initalizeRoutes;
