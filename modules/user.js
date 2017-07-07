//required
const express = require('express'),
  router = express.Router(),
  bodyParser = require('body-parser'),
  pg = require('pg');

//globals
var config = {
  database: 'capture',
  host: 'localhost',
  port: 5432,
  max: 20
};
var pool = new pg.Pool(config);

//uses
router.use(bodyParser.urlencoded({
  extended: true
}));

//routes
router.post('/', (req, res) => {
  console.log('in user/post', req.body);
  res.send('user/post');
});


router.post('/:id', (req, res) => {
  console.log('in user/post/id', req.body, req.params.id);
  res.send('user/post/id');
});




//export
module.exports = router;

/*

pool.connect(function(err, connection, done) {
  if (err) {
    console.log(err);
    done();
    res.sendStatus(400);
  } else {
    console.log('connected to db');
    var all_ = [];
    var resultSet = connection.query('SELECT * FROM _');
    resultSet.on('row', function(row) {
      allPets.push(row);
    });
    resultSet.on('end', function() {
      done();
      res.send(all_);
    });
  }
});

*/
