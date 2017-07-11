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
router.get('/:user/:bucketName', (req, res) => {
  console.log(req.params.user);
  console.log(req.params.bucketName);
  console.log('in snippet get');
  db.connect((err, connection, done) => {
    if (err) {
      console.log(err);
      done();
    } else {
      let allSnippets = "SELECT * FROM snippets ";
      allSnippets += "JOIN buckets ON snippets.bucket_id = buckets.id ";
      allSnippets += "JOIN users ON buckets.user_name = users.username ";
      allSnippets += "WHERE users.username= $1 AND buckets.bucket_name = $2";
      let results = [];
      let checkFeed = connection.query(allSnippets, [req.params.user, req.params.bucketName]);
      checkFeed.on('row', (row) => {
        results.push(row);
      });
      checkFeed.on('end', () => {
        console.log(results);
        done();
        res.send(results);
      });
    }
  }); //db.connect
}); //end get all snippets


//exports
module.exports = router;
