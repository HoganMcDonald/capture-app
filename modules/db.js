//required
const pg = require('pg');

//globals

if (process.env.DATABASE_URL) {
  var params = url.parse(process.env.DATABASE_URL);
  var auth = params.auth.split(':');

  config = {
    user: auth[0],
    password: auth[1],
    host: params.hostname,
    port: params.port,
    database: params.pathname.split('/')[1],

    ssl: true,
    max: 10,
    idleTimeoutMillis: 30000,
  };

} else {

  const config = {
    database: 'capture',
    host: 'localhost',
    port: 5432,
    max: 20
  };

}

const pool = new pg.Pool(config);

//export
module.exports = pool;
