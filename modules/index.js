//required
const express = require('express'),
  router = express.Router(),
  path = require('path');

//functions
router.get('/', (req, res) => {
  res.sendFile(path.resolve('public/views/index.html'));
});

//export
module.exports = router;
