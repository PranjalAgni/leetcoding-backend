const { Knex } = require('knex');
const { tableNames } = require('../../src/constants/');
const { addTimestampColumns } = require('../helpers/timestamp');

/**
 *
 * @param {Knex} knex
 */
exports.up = async function (knex) {
  await knex.schema.createTable(tableNames.tags, (table) => {
    table.increments('pk_tag_id').notNullable();
    table.string('name', 100).notNullable().unique();
    addTimestampColumns(table);
  });

  await knex.schema.createTable(tableNames.problemsSolvedTimeline, (table) => {
    table.increments('pk_problems_solved_timeline_id').notNullable();
    table.string('problem_name', 500).notNullable();
    table
      .integer('fk_tag_id')
      .references('pk_tag_id')
      .inTable(tableNames.tags)
      .onDelete('cascade');
    table.string('problem_url', 1000).nullable();
    table.datetime('solution_created_at').notNullable();
    addTimestampColumns(table);
  });
};

/**
 *
 * @param {Knex} knex
 */
exports.down = async function (knex) {
  // const tableNamesList = Object.values(tableNames);
  await knex.schema.dropTable(tableNames.problemsSolvedTimeline);
  await knex.schema.dropTable(tableNames.problemsSolvedTimeline);
  // await Promise.all(
  //   tableNamesList.map((tableName) => knex.schema.dropTable(tableName))
  // );
};
