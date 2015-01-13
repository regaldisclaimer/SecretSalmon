var express = require('express');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');

var app = express();

app.get('/', function (request, response) {
  response.set('Content-Type', 'text/html');
  response.send('<p>Hey, it works!</p>');
});

var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'deanslistoffers@gmail.com',
        pass: process.env.GPASS
    }
});

var mailOptions = {
    from: 'Fred Foo ✔ <foo@blurdybloop.com>', // sender address
    to: 'bar@blurdybloop.com, baz@blurdybloop.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world ✔', // plaintext body
    html: '<b>Hello world ✔</b>' // html body
};

app.post('/sendOffer'), function(req, res){
	req.body.senderEmail;
	req.body.receiverEmail;
	req.body.offerPath;
	req.body.message;
	req.body.textbook;
	req.body.ammount;

}

app.listen(process.env.PORT || 3000);