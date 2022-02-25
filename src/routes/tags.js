const TagsService = require('../services/TagsService');

const TagsRouter = (fastify, _opts, done) => {
  fastify.get('/', async (_request, reply) => {
    const tagsList = await TagsService.getAllTags();
    reply.code(200).send(tagsList);
  });
  done();
};

module.exports = TagsRouter;
