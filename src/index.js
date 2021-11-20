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
 * @returns {{[name: string]: string[]]}} solutionInfo
 */
const prepareSolutionInfoObject = async (
  leetcodeDirectory,
  categorySolutionMap
) => {
  const solutionInfo = {};
  for (const [category, solutions] of categorySolutionMap) {
    const solutionList = [];
    for (const solutionName of solutions) {
      const solutionPath = path.join(leetcodeDirectory, category, solutionName);
      const solutionStats = await fs.lstat(solutionPath);
      const solutionInfo = {
        name: solutionName,
        createdAt: solutionStats.birthtime,
      };
      solutionList.push(solutionInfo);
    }

    solutionInfo[category] = solutionList;
  }

  return solutionInfo;
};

/**
 *
 * @param {{[name: string]: string[]]}} solutionInfo
 */
const writeSolutionDataToDisk = async (solutionInfo) => {
  const startTime = process.hrtime.bigint();
  const solutionDataFile = path.join(__dirname, 'data', 'solution-info.json');
  await fs.writeFile(solutionDataFile, JSON.stringify(solutionInfo, null, 2));

  console.log(
    `Successfully written the data: ${process.hrtime.bigint() - startTime}`
  );
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

  const solutionInfo = await prepareSolutionInfoObject(
    config.leetcodeDir,
    categorySolutionMap
  );

  await writeSolutionDataToDisk(solutionInfo);
};

main();
