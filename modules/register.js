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

//register new user route
router.post('/', (req, res) => {
  console.log('in /register');
  res.send('registered');
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
//   pool.connect(function(err, connection, done) {
//     if (err) {
//       console.log(err);
//       done();
//     } else {
//       var results = [];
//       var checkUsername = connection.query("SELECT * FROM users WHERE id = $1", [req.params.id]);
//       checkUsername.on('row', function(row) {
//         results.push(row);
//       });
//       checkUsername.on('end', function() {
//         if (results) {
//           usernameExists = true;
//           console.log(usernameExists);
//         }
//         done();
//       });
//     } //end if else
//   }); //end pool.connect
//   console.log(usernameExists);
//   res.send('user/post/id');
// });
