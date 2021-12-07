const { db } = require('./src/config/');

module.exports = {
  development: {
    client: 'pg',
    useNullAsDefault: true,
    connection: {
      host: db.host,
      port: 5432,
      user: db.username,
      password: db.password,
      database: db.name,
    },
    migrations: {
      directory: 'db/migrations',
    },
    seeds: {
      directory: 'db/seeds',
    },
  },

  production: {},
};
