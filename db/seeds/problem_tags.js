const Knex = require('knex');
const { tableNames } = require('../../src/constants/');
const { getProblemsTags, getProblemsJSON } = require('../helpers/data');

/**
 *
 * @param {Knex} knex
 *
 */
exports.seed = async function (knex) {
  await Promise.all(
    Object.values(tableNames).map((tableName) => knex(tableName).del())
  );
  const tagNamesList = await getProblemsTags();
  const rows = tagNamesList.map((tagName, idx) => ({
    pk_tag_id: idx,
    name: tagName,
    created_at: new Date(),
    updated_at: new Date(),
  }));

  await knex(tableNames.tags).insert(rows);
  const problemsJson = await getProblemsJSON();

  for await (const tag of tagNamesList) {
    const { pk_tag_id: tagId } = await knex
      .select('pk_tag_id')
      .from(tableNames.tags)
      .where('name', tag)
      .then((row) => row[0]);

    const problemsByTag = problemsJson[tag];
    await Promise.all(
      problemsByTag.map((problem) => {
        const row = {
          problem_name: problem.name,
          fk_tag_id: tagId,
          solution_created_at: problem.createdAt,
          created_at: new Date(),
          updated_at: new Date(),
        };

        return knex(tableNames.problemsSolvedTimeline).insert(row);
      })
    );
  }
};
