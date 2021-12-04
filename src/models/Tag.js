const { Model } = require('objection');
const { tableNames } = require('../constants/');

class Tag extends Model {
  static get tableName() {
    return tableNames.tags;
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name'],

      properties: {
        pk_tag_id: { type: 'integer' },
        name: { type: 'string', minLength: 1, maxLength: 255 },
      },
    };
  }
}

module.exports = Tag;
