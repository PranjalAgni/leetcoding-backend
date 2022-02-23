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
          maxLength: 500,
        },
        problem_url: {
          type: 'string',
          maxLength: 1000,
        },
        solution_created_at: {
          type: 'date-time',
        },
      },
    };
  }

  static get relationMappings() {
    const Tag = require('./Tag');
    return {
      fk_tag_id: {
        relation: Model.HasManyRelation,
        modelClass: Tag,
        join: {
          from: `${tableNames.problemsSolvedTimeline}.fk_tag_id`,
          to: `${tableNames.tags}.pk_tag_id`,
        },
      },
    };
  }
}

module.exports = ProblemsSolved;
