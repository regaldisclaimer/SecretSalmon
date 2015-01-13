var exports = module.exports = {}; // Used to export the sendMail function

/*
	@param body: pass in req.body from the original request
	@param transporter: nodemailer Transport
	Formats and send an email based on information in body
*/ 
exports.sendMail = function (body, transporter, callback) {
	
	// Set basic mail options
	var mailOptions = {
		// REMOVE JIM'S EMAIL
		from: 'Deanslist', // Should use process.env
		to: body.recipient,
		subject: 'Dean\'s list offer',
	};

	console.log(body.recipient);

	// Re-format, make pretty
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

	transporter.sendMail(mailOptions, function(error, response) {
		console.log(error);
		callback(error);
	});
};
