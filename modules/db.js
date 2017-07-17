//required
const pg = require('pg');

//globals

config = {};

if (process.env.DATABASE_URL) {
  var params = url.parse(process.env.DATABASE_URL);
  var auth = params.auth.split(':');

  config = {
    user: auth[0],
    password: auth[1],
    host: params.hostname,
    port: params.port,
    database: params.pathname.split('/')[1],

    ssl: true, // heroku requires ssl to be true
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
  };

} else {

  config = {
    database: 'capture',
    host: 'localhost',
    port: 5432,
    max: 20
  };

}

const pool = new pg.Pool(config);

//export
module.exports = pool;
