const config = require('../../src/config/');
const path = require('path');
const fs = require('fs/promises');
const {
  parseLeetcodeDirectory,
  writeSolutionDataToDisk,
  filterDotFiles,
  getCategoryVsSolutionMap,
} = require('../utils/files');

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

const scrape = async () => {
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

  const solutionPath = path.join(
    __dirname,
    '../../db/data',
    'solution-info.json'
  );
  await writeSolutionDataToDisk(solutionPath, solutionInfo);
};

scrape();
