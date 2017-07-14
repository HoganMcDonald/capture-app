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
router.get('/:searchTerm/:user', (req, res) => {
  console.log(req.params.searchTerm);

  db.connect((err, connection, done) => {
    if (err) {
      done();
      res.send(400);
    } else {
      let results = [];
      let searchQuery = connection.query("SELECT * FROM snippets JOIN buckets ON snippets.bucket_id = buckets.id JOIN users ON buckets.user_name = users.username WHERE username = '" + req.params.user + "' AND snippet_content LIKE '%" + req.params.searchTerm + "%'");
      searchQuery.on('row', (row) => {
        results.push(row);
      });
      searchQuery.on('end', () => {
        done();
        res.send(results);
      });
    } //end check for err
  }); //end db.conenct
}); //end search


//exports
module.exports = router;
