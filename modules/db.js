//required
const pg = require('pg');

//globals
const config = {
  database: 'capture',
  host: 'localhost',
  port: 5432,
  max: 20
};

const pool = new pg.Pool(config);

//export
module.exports = pool;
