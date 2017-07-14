//required
const express = require('express'),
  app = express(),
  register = require('./modules/register'),
  snippet = require('./modules/snippet'),
  bucket = require('./modules/bucket'),
  search = require('./modules/search'),
  email = require('./modules/email'),
  index = require('./modules/index');

const port = process.env.PORT || 8888;

//uses
app.use(express.static('public'))
  .use('/', index)
  .use('/register', register)
  .use('/snippet', snippet)
  .use('/bucket', bucket)
  .use('/search', search)
  .use('/email', email);

// spin up server
app.listen(port, () => {
  console.log('up on port', port);
});
