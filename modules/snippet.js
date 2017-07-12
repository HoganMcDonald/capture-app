//requires
const express = require('express'),
  router = express.Router(),
  db = require('./db'),
  pg = require('pg'),
  ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3'),
  watsonCreds = require('./watsonCreds'),
  bodyParser = require('body-parser');

//globals
let tone_analyzer = new ToneAnalyzerV3({
  username: watsonCreds.username,
  password: watsonCreds.password,
  version_date: '2016-05-19'
});

//access watson
let analyzeTone = (string) => {
  let params = {
    text: string,
    tones: ['emotion', 'social']
  };
  tone_analyzer.tone(params, (err, tone) => {
    if (err) {
      console.log(err);
      return;
    } else {
      return JSON.stringify(tone);
    } //err check
  }); //end tone_analyzer

}; //end watson


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
        row.tone_info = JSON.parse(row.tone_info);
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
  let params = {
    text: req.body.text,
    tones: ['emotion', 'social']
  };
  tone_analyzer.tone(params, (err, tone) => {
    if (err) {
      console.log(err);
      return;
    } else {
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
            let postQuery = "INSERT INTO snippets (snippet_content, img_url, bucket_id, tone_info) VALUES ($1, $2, $3, $4);"
            connection.query(postQuery, [req.body.text, req.body.img_url, results[0].id, JSON.stringify(tone)]);
            done();
            res.send('posted')
          });
        }
      }); //end db.connect
    } //err check
  }); //end tone_analyzer
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
