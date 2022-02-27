const ProblemsSolved = require('../models/ProblemsSolved');

class ProblemsSolvedService {
  async getAllProblemsSolved() {
    const problemsSolved = await ProblemsSolved.query();
    return problemsSolved;
  }

  async getProblemsSolvedByTagId(tagId) {
    const problemsSolved = await ProblemsSolved.query().where({
      fk_tag_id: tagId,
    });

    return problemsSolved;
  }
}

module.exports = new ProblemsSolvedService();
