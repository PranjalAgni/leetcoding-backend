const ProblemsSolved = require('../models/ProblemsSolved');

class ProblemsSolvedService {
  async getAllProblemsSolved() {
    const problemsSolved = await ProblemsSolved.query();
    return problemsSolved;
  }
}

module.exports = new ProblemsSolvedService();
