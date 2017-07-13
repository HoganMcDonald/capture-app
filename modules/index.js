//required
const express = require('express'),
  router = express.Router(),
  db = require('./db'),
  bodyParser = require('body-parser'),
  bcrypt = require('bcrypt'),
  path = require('path');

//uses
router.use(bodyParser.urlencoded({
  extended: true
}));
router.use(bodyParser.json());


//routes
router.get('/', (req, res) => {
  res.sendFile(path.resolve('public/views/index.html'));
});

//login route
router.post('/', (req, res) => {
  //connect to database
  db.connect((err, connection, done) => {
    if (err) {
      console.log(err);
      done();
    } else {
      let results = [];
      let newQuery = 'SELECT username, password_hash, buckets.id, bucket_name FROM users JOIN buckets ON buckets.user_name = users.username WHERE username = $1'
      let checkUsername = connection.query(newQuery, [req.body.username]);
      //push query results to results
      checkUsername.on('row', (row) => {
        results.push(row);
      });
      checkUsername.on('end', () => {
        //if username exists
        if (results.length > 0) {
          //check hashes
          bcrypt.compare(req.body.password, results[0].password_hash, function(err, isMatch) {
            if (err) {
              done();
              console.log('bcrypt failure');
              res.send('error'); //<--- bcrypt failure
            } else {
              if (isMatch) {
                done();
                res.send(results);
              } else {
                console.log('password incorrect');
                done();
                res.send('error'); //<--- password incorrect
              }
            }
          });
        } else {
          console.log('username does not exist');
          done();
          res.send('error'); //<--- usernamen does not exist
        } //end check if username and password were a match
      }); //end on end
    } //end if err
  }); //end db.connect
}); // end login route

//export
module.exports = router;
