const { Knex } = require('knex');
/**
 *
 * @param {Knex.CreateTableBuilder} table
 */

const addTimestampColumns = (table) => {
  table.dateTime('created_at').notNullable();
  table.dateTime('updated_at').notNullable();
  table.dateTime('deleted_at').nullable();
};

module.exports = {
  addTimestampColumns,
};
