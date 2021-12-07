const Knex = require('knex');
const { tableNames } = require('../../src/constants/');
const { getProblemsTags } = require('../helpers/data');

/**
 *
 * @param {Knex} knex
 *
 */
exports.seed = async function (knex) {
  await knex(tableNames.tags).del();
  const tagNamesList = await getProblemsTags();
  const rows = tagNamesList.map((tagName, idx) => ({
    pk_tag_id: idx,
    name: tagName,
    created_at: new Date(),
    updated_at: new Date(),
  }));

  await knex(tableNames.tags).insert(rows);
};
