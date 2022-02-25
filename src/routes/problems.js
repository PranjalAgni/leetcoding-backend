const ProblemsSolvedService = require('../services/ProblemsSolvedService');

const problemRouter = (fastify, _opts, done) => {
  fastify.get('/', async (_request, reply) => {
    const problemsSolvedList =
      await ProblemsSolvedService.getAllProblemsSolved();
    reply.code(200).send(problemsSolvedList);
  });

  done();
};

module.exports = problemRouter;
