const fs = require('fs/promises');
const path = require('path');

const getProblemsTags = async () => {
  const dataPath = getDataFilePath();
  const problemsJson = await fs.readFile(dataPath, 'utf-8');
  return Object.keys(JSON.parse(problemsJson));
};

const getDataFilePath = () => {
  return path.join(__dirname, '../data', 'solution-info.json');
};

module.exports = {
  getProblemsTags,
};
