const fs = require('fs/promises');
const path = require('path');

const getProblemsTags = async () => {
  const problemsJson = await getProblemsJSON();
  return Object.keys(problemsJson);
};

const getProblemsJSON = async () => {
  const dataPath = getDataFilePath();
  const problemsJson = await fs.readFile(dataPath, 'utf-8');
  return JSON.parse(problemsJson);
};

const getDataFilePath = () => {
  return path.join(__dirname, '../data', 'solution-info.json');
};

module.exports = {
  getProblemsTags,
  getProblemsJSON,
};
