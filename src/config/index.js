require('dotenv').config();

process.env.NODE_ENV = 'development' || process.env.NODE_ENV;

module.exports = {
  isDev: process.env.NODE_ENV === 'development',
  env: process.env.NODE_ENV,
  port: parseInt(process.env.PORT, 10),
  leetcodeDir: '/Users/pranjal.dev/coding/Codeforces/leetcode-effectively',
  db: {
    host: process.env.DB_HOST,
    name: process.env.DB_SCHEMA,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
};
