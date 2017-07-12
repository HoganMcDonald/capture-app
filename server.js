//required
const express = require('express'),
  app = express(),
  register = require('./modules/register'),
  snippet = require('./modules/snippet'),
  bucket = require('./modules/bucket'),
  index = require('./modules/index');

const port = process.env.PORT || 8888;

//uses
app.use(express.static('public'));
app.use('/', index);
app.use('/register', register);
app.use('/snippet', snippet);
app.use('/bucket', bucket);

// spin up server
app.listen(port, () => {
  console.log('up on port', port);
});
