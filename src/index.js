const config = require('./config');
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
 *
 * @param {string} leetcodeDirectory
 * @param {Map<string, string[]>} categorySolutionMap
 * @returns {{name: string, category: string, createdAt: string}[]} solutionInfoList
 */
const prepareSolutionInfoList = async (
  leetcodeDirectory,
  categorySolutionMap
) => {
  const solutionInfoList = [];
  for (const [category, solutionList] of categorySolutionMap) {
    for (let idx = 0; idx < solutionList.length; idx++) {
      const solutionName = solutionList[idx];
      const solutionPath = path.join(leetcodeDirectory, category, solutionName);
      const solutionStats = await fs.lstat(solutionPath);
      const solutionInfo = {
        name: solutionName,
        category,
        createdAt: solutionStats.birthtime,
      };
      solutionInfoList.push(solutionInfo);
    }
  }

  return solutionInfoList;
};

const main = async () => {
  const questionCategory = await parseLeetcodeDirectory(
    config.leetcodeDir,
    filterDotFiles
  );

  const categorySolutionMap = await getCategoryVsSolutionMap(
    config.leetcodeDir,
    questionCategory
  );

  const solutionInfoList = await prepareSolutionInfoList(
    config.leetcodeDir,
    categorySolutionMap
  );
  console.log(solutionInfoList);
};

main();
