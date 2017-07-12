//requires
const express = require('express'),
  router = express.Router(),
  db = require('./db'),
  pg = require('pg'),
  bodyParser = require('body-parser');

//uses
router.use(bodyParser.urlencoded({
  extended: true
}));
router.use(bodyParser.json());

//routes
router.get('/:username', (req, res) => {
  db.connect((err, connection, done) => {
    if (err) {
      console.log(err);
      done();
      res.sendStatus(400);
    } else {
      let results = [];
      let bucketsQuery = connection.query('SELECT * FROM buckets JOIN users ON buckets.user_name = users.username WHERE users.username = $1', [req.params.username]);
      bucketsQuery.on('row', (row) => {
        results.push(row);
      });
      bucketsQuery.on('end', () => {
        done();
        res.send(results);
      }); //end make query
    } //end if err
  }); //end db.connect
}); //end get by username


//exports
module.exports = router;
