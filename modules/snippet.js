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
  db.connect((err, connection, done) => {
    if (err) {
      console.log(err);
      done();
      res.sendStatus(400);
    } else {
      let allSnippets = "SELECT snippets.id, snippet_content, img_url, tone_info, bucket_id FROM snippets ";
      allSnippets += "JOIN buckets ON snippets.bucket_id = buckets.id ";
      allSnippets += "JOIN users ON buckets.user_name = users.username ";
      allSnippets += "WHERE users.username= $1 AND buckets.id = $2";
      let results = [];
      let checkFeed = connection.query(allSnippets, [req.params.user, req.params.bucketName]);
      checkFeed.on('row', (row) => {
        results.push(row);
      });
      checkFeed.on('end', () => {
        done();
        res.send(results);
      });
    }
  }); //db.connect
}); //end get all snippets

//post snippets
router.post('/', (req, res) => {
  //connect to db
  db.connect((err, connection, done) => {
    if (err) {
      console.log(err);
      done();
      res.sendStatus(400);
    } else {
      let results = [];
      let checkBucketIdQuery = "SELECT id FROM buckets JOIN users ON buckets.user_name = users.username WHERE users.username= $1 AND buckets.bucket_name = $2"
      let checkBucketId = connection.query(checkBucketIdQuery, [req.body.user, req.body.bucket]);
      checkBucketId.on('row', (row) => {
        results.push(row);
      });
      checkBucketId.on('end', () => {
        connection.query("INSERT INTO snippets (snippet_content, bucket_id) VALUES ($1, $2);", [req.body.text, results[0].id]);
        done();
        res.send('posted')
      });
    }
  }); //end db.connect
}); // end post new snippet

//delete snippet from db
router.delete('/:id', (req, res) => {
  console.log(req.params);
  //connect to db
  db.connect((err, connection, done) => {
    if (err) {
      console.log(err);
      done();
      res.sendStatus(400);
    } else {
      let deleteQuery = "DELETE FROM snippets WHERE id = $1";
      let deleteRequest = connection.query(deleteQuery, [Number(req.params.id)]);
      done();
      res.send('deleted')
    }
  }); //end db.connect
}); //end delete snippet

//exports
module.exports = router;
