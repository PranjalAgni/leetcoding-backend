const { Knex } = require('knex');
const { tableNames } = require('../../src/constants/');

/**
 *
 * @param {Knex} knex
 */
exports.up = async function (knex) {
  await knex.schema.createTable(tableNames.tags, (table) => {
    table.increments('pk_tag_id').notNullable();
    table.string('name', 100).notNullable().unique();
    table.datetime('solution_created_at').notNullable();
    table.string('problem_url').nullable();
  });
};

/**
 *
 * @param {Knex} knex
 */
exports.down = async function (knex) {
  await knex.schema.dropTable(tableNames.tags);
};
