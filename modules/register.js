//required
const express = require('express'),
  router = express.Router(),
  bodyParser = require('body-parser'),
  db = require('./db'),
  pg = require('pg');

//uses
router.use(bodyParser.urlencoded({
  extended: true
}));
router.use(bodyParser.json());

//register new user route
router.post('/', (req, res) => {
  console.log(req.body);
  //
  db.connect((err, connection, done) => {
    if (err) {
      console.log(err);
      done();
    } else {
      let results = [];
      let checkUsername = connection.query("select 1 FROM users WHERE username = $1", [req.body.username]);
      checkUsername.on('row', (row) => {
        results.push(row);
      });
      checkUsername.on('end', () => {
        console.log(results);
        //if name is taken
        if (results.length > 0) {
          done();
          res.send('Username already exists!')
        } else { //otherwise, create user
          let userQuery = 'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3)';
          let feedQuery = 'INSERT INTO buckets (bucket_name, user_name) VALUES ($1, $2)';
          connection.query(userQuery, [req.body.username, req.body.email, req.body.password]);
          connection.query(feedQuery, ["feed", req.body.username]);
          done();
          res.send('registered');
        }
      });
    } // end error catching
  }); //end db connect
}); //end register new user

//export
module.exports = router;
