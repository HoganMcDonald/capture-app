//required
const express = require('express'),
  router = express.Router(),
  db = require('./db'),
  bodyParser = require('body-parser'),
  path = require('path');

//uses
router.use(bodyParser.urlencoded({
  extended: true
}));
router.use(bodyParser.json());


//functions
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
      let checkUsername = connection.query("select 1 FROM users WHERE username = $1 AND password_hash = $2", [req.body.username, req.body.password]);
      checkUsername.on('row', (row) => {
        results.push(row);
      });
      checkUsername.on('end', () => {
        if (results.length > 0) {
          done();
          res.send('success');
        } else {
          done();
          res.send('error');
        } //end check if username and password were a match
      }); //end on end
    } //end if err
  }); //end db.connect
}); // end login route

//export
module.exports = router;
