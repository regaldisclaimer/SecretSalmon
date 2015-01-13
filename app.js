var express = require('express');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var mailer = require('./sendOffer.js');

var app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Not sure if we need
app.use(function (req, res, next) {
  	res.header("Access-Control-Allow-Origin", "*");
  	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  	next();
});

app.get('/', function (request, response) {
  response.set('Content-Type', 'text/html');
  response.send('<p>Hey, it works!</p>');
});

var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.GNAME,
        pass: process.env.GPASS
    }
});

app.post('/sendOffer', function(req, res) {
	console.log(req.body);
	mailer.sendMail(req.body, transporter);
	res.send('Hi!');
});

app.listen(process.env.PORT || 3000);