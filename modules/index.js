//required
const express = require('express'),
  router = express.Router(),
  db = require('./db'),
  path = require('path');

//functions
router.get('/', (req, res) => {
  res.sendFile(path.resolve('public/views/index.html'));
});

//login route
router.post('/', (req, res) => {
  console.log('in user/post', req.body);
  res.send('user/post');
}); // end login route



//export
module.exports = router;
