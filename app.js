var express = require('express');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var mailer = require('./sendOffer.js');

var app = express();

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

app.post('/sendOffer'), function(req, res){
	res.send(mailer.sendMail(req.body, transporter));
}

app.listen(process.env.PORT || 3000);