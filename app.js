var express = require('express');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');
var firebase = require('firebase');

var mailer = require('./sendOffer.js');
var createUser = require('./signupUser.js');

var app = express();


var transportOptions = {
	auth: {
		api_user: process.env.MNAME,
		api_key: process.env.MPASS
	}
}

var firebaseRef = new firebase("https://deans.firebaseio.com/");

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

var transporter = nodemailer.createTransport(sgTransport(transportOptions));


// NEED TO TEST MORE/TEST SECURITY
app.post('/sendOffer', function(req, res) {
	mailer.sendMail(req.body, transporter, function(error) {
		if (error) {
			res.json({ error: true });
		} else {
			res.json({ error: false });
		}
	});
});


// NEED TO TEST MORE/DEFINITELY TEST SECURITY
app.post('/createUser', function(req, res) {
	createUser.registerUser(req.body, firebaseRef, function(error) {
		if (error) {
			res.json({ error: true });
		} else {
			res.json({ error: false });
		}
	});
});

app.listen(process.env.PORT || 3000);