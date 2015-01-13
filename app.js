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

var userName = process.env.MNAME;
console.log(process.env.MNAME);
console.log(userName);
var userPass = process.env.MPASS;
console.log(process.env.MPASS);
console.log(userPass);

var transportOptions = {
	auth: {
		api_user: process.env.MNAME,
		api_key: process.env.MPASS
	}
}

var transporter = nodemailer.createTransport(sgTransport(transportOptions));

app.post('/sendOffer', function(req, res) {
	mailer.sendMail(req.body, transporter); // ADD CALLBACK SO WE CAN RESPOND WITH SUCCESS ASYNCHRONOUSLY
	res.send('Hi!');
});

app.listen(process.env.PORT || 3000);