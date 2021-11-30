const path = require('path');
const fs = require('fs/promises');

/**
 *
 * @param {string} fileName
 * @returns {boolean}
 */
const filterDotFiles = (fileName) =>
  !fileName.startsWith('.') && !fileName.endsWith('.md');

/**
 *
 * @param {string} leetcodeDirectory
 * @param {function} filterCriteria
 * @returns {string[]}
 */
const parseLeetcodeDirectory = async (leetcodeDirectory, filterCriteria) => {
  const allDirectory = await fs.readdir(path.resolve(leetcodeDirectory));
  const questionCategory = allDirectory.filter((folder) =>
    filterCriteria(folder)
  );
  return questionCategory;
};

/**
 *
 * @param {string} leetcodeDirectory
 * @param {string[]} questionCategory
 * @returns {Map<string, string[]>} categorySolutionMap
 */
const getCategoryVsSolutionMap = async (
  leetcodeDirectory,
  questionCategory
) => {
  const categorySolutionMap = new Map();
  for (let idx = 0; idx < questionCategory.length; idx++) {
    const category = questionCategory[idx];
    const categoryPath = path.join(leetcodeDirectory, category);
    const solutionsInThisCategory = await fs.readdir(categoryPath);
    categorySolutionMap.set(category, solutionsInThisCategory);
  }

  return categorySolutionMap;
};

/**
 * @param {string} solutionPath
 * @param {{[name: string]: string[]]}} solutionInfo
 */
const writeSolutionDataToDisk = async (solutionPath, solutionInfo) => {
  const startTime = process.hrtime.bigint();
  const solutionDataFile = path.resolve(solutionPath);
  await fs.writeFile(solutionDataFile, JSON.stringify(solutionInfo, null, 2));

  console.log(
    `Successfully written the data: ${process.hrtime.bigint() - startTime}`
  );
};

module.exports = {
  filterDotFiles,
  parseLeetcodeDirectory,
  getCategoryVsSolutionMap,
  writeSolutionDataToDisk,
};
