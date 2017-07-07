//required
const express = require('express'),
  app = express(),
  register = require('./modules/register.js'),
  index = require('./modules/index.js');

const port = process.env.PORT || 8888;

//uses
app.use(express.static('public'));
app.use('/', index);
app.use('/register', register);

// spin up server
app.listen(port, () => {
  console.log('up on port', port);
});
