const ProblemsSolvedService = require('../services/ProblemsSolvedService');
const TagsService = require('../services/TagsService');

const problemRouter = (fastify, _opts, done) => {
  fastify.get('/', async (_request, reply) => {
    const problemsSolvedList =
      await ProblemsSolvedService.getAllProblemsSolved();
    reply.code(200).send(problemsSolvedList);
  });

  fastify.get('/:tagName', async (request, reply) => {
    const { tagName } = request.params;
    const tag = await TagsService.getTagByName(tagName);
    if (!tag)
      return reply.code(200).send({ message: 'No tag exist with this name' });
    const problemsSolved =
      (await ProblemsSolvedService.getProblemsSolvedByTagId(tag.pk_tag_id)) ??
      [];

    reply.code(200).send({
      count: problemsSolved.length,
      problemsSolved,
    });
  });

  done();
};

module.exports = problemRouter;
