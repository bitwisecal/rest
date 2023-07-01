import knex from 'knex';
import config from '../config/config';

const pg = knex({
  client: 'pg',
  //debug: true,
  connection: config.databaseURL,
  searchPath: ['knex', 'public'],
  pool: {
    min: 10,
    max: 10
  }
});

export default pg;
