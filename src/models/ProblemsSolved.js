const { Model } = require('objection');
const { tableNames } = require('../constants/');

class ProblemsSolved extends Model {
  static get tableName() {
    return tableNames.problemsSolvedTimeline;
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['problem_name', 'problem_url', 'solution_created_at'],

      properties: {
        pk_problems_solved_timeline_id: { type: 'integer' },
        problem_name: {
          type: 'string',
          minLength: 1,
          maxLength: 255,
        },
        problem_url: {
          type: 'string',
          minLength: 5,
          maxLength: 500,
        },
        solution_created_at: {
          type: 'Date',
        },
      },
    };
  }
}

module.exports = ProblemsSolved;
