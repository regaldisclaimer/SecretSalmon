var exports = module.exports = {}; // Used to export the sendMail function

/*
	@body: pass in req.body from the original request
	@transporter: nodemailer Transport
	Formats and send an email based on information in body
*/ 
exports.sendMail = function (body, transporter) {
	
	// Set basic mail options
	var mailOptions = {
		from: 'Dean\'s List <deanslistoffers@gmail.com>',
		to: body.recipient,
		subject: 'Dean\'s list offer',
	};

	var message = '<p>';
	message += 'Hello!';
	message += '\n\n' + body.sender + ' has';
	message += ' made an offer for one of your posted textbooks:\n\n';
	message += body.message;
	message += '\n\n';
	message += 'To follow up, send an email to ' + body.sender + '.';
	message += '\nTo view your post, go here: ' + body.postPath;
	message += '</p>';

	mailOptions.html = message;

	var didError = false;

	transporter.sendMail(mailOptions, function(error, response) {
		if (error) {
			didError = true;
		}
	});

	return (!didError);
};
