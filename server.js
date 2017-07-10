//required
const express = require('express'),
  app = express(),
  register = require('./modules/register'),
  snippet = require('./modules/snippet'),
  index = require('./modules/index');

const port = process.env.PORT || 8888;

//uses
app.use(express.static('public'));
app.use('/', index);
app.use('/register', register);
app.use('/snippet', snippet);

// spin up server
app.listen(port, () => {
  console.log('up on port', port);
});
