//required
const express = require('express'),
  router = express.Router(),
  bodyParser = require('body-parser'),
  db = require('./db'),
  Sequelize = require('sequelize'),
  pg = require('pg');



// const sequelize = new Sequelize('postgres://@127.0.0.1:5432/capture');
//
// //auth connection to DB
// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully.');
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   }); //end db auth

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
          let feedQuery = 'INSERT INTO buckets (bucket_name, user_id) VALUES ($1, $2)';
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





// ////////////// notes
//check if username exists

//if no, insert into users
//get id from new user
//insert into buckets
//return "user created"

//if yes, return "username is taken"






// router.post('/:id', (req, res) => {
//   var usernameExists = false;
//   //make query
// pool.connect(function(err, connection, done) {
//   if (err) {
//     console.log(err);
//     done();
//   } else {
//     var results = [];
//     var checkUsername = connection.query("SELECT * FROM users WHERE id = $1", [req.params.id]);
//     checkUsername.on('row', function(row) {
//       results.push(row);
//     });
//     checkUsername.on('end', function() {
//       if (results) {
//         usernameExists = true;
//         console.log(usernameExists);
//       }
//       done();
//     });
//   } //end if else
// }); //end pool.connect
//   console.log(usernameExists);
//   res.send('user/post/id');
// });
