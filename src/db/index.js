const { Model } = require('objection');
const { db } = require('../config/');
const Knex = require('knex');

const connectDB = () => {
  const knex = Knex({
    client: 'pg',
    useNullAsDefault: true,
    connection: {
      host: db.host,
      port: 5432,
      user: db.username,
      password: db.password,
      database: db.name,
    },
  });

  Model(knex);
  return knex;
};

module.exports = connectDB;
