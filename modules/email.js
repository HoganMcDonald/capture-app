//requires
const express = require('express'),
  router = express.Router(),
  db = require('./db'),
  pg = require('pg'),
  nodemailer = require('nodemailer'),
  gmail = require('./gmail'),
  bodyParser = require('body-parser');

//uses
router.use(bodyParser.urlencoded({
  extended: true
}));
router.use(bodyParser.json());

//globals
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmail.username, //YOUR GMAIL USER HERE -> EXAMPLE@gmail.com
    pass: gmail.password //YOUR GMAIL PASSWORD, DO NOT HOST THIS INFO ON GITHUB!
  }
});

router.post('/', (req, res) => {
  console.log(req.body);
  db.connect((err, connection, done) => {
    if (err) {
      console.log(err);
      done();
      res.sendStatus(400);
    } else {
      let results = [];
      let dbQuery = connection.query('SELECT * FROM snippets WHERE bucket_id = $1', [req.body.id]);
      dbQuery.on('row', (row) => {
        results.push(row);
      });
      dbQuery.on('end', () => {


        let mailOptions = {
          from: gmail.email,
          to: req.body.email, // list of receivers
          subject: req.body.bucket_name, // Subject line
          // text: 'giberish', // plain text body
          html: '<h1>' + req.body.bucket_description + '</h1>' + createHTML(results) // html body
        };

        console.log(mailOptions.html);

        transporter.sendMail(mailOptions, function(error, info) {
          if (error) {
            return console.log(error);
          }
          console.log('Message sent:', info.messageId, info.response);
        });


        done();
        res.send('sent');
      }); //end push to results
    } //end check err
  }); //end db.connect

}); //end email post




//takes bucket obj and creates html
let createHTML = (arr) => {
  let htmlToReturn = '<ol>';
  for (var i = 0; i < arr.length; i++) {
    htmlToReturn += ('<li>' + arr[i].snippet_content + '</li>');
  }
  return htmlToReturn + '</ol>';
}; //end generate html







//exports
module.exports = router;
