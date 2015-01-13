var express = require('express');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var mailer = require('./sendOffer.js');
var sgTransport = require('nodemailer-sendgrid-transport');

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

var transportOptions = {
	auth: {
		api_user: process.env.NAME,
		api_key: process.env.PASS
	}
}

var transporter = nodemailer.createTransport(sgTransport(transportOptions));

app.post('/sendOffer', function(req, res) {
	mailer.sendMail(req.body, transporter);
	res.send('Hi!');
});

app.listen(process.env.PORT || 3000);