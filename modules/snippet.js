//requires
const express = require('express'),
  router = express.Router(),
  db = require('./db'),
  bodyParser = require('body-parser');

//uses
router.use(bodyParser.urlencoded({
  extended: true
}));
router.use(bodyParser.json());

//routes
router.get('/:id', () => {
  console.log('in snippet get');
  res.send('in snippet get');
}); //end get all snippets


//exports
module.exports = router;
