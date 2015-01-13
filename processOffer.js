var exports = module.exports = {}; // Used to export the sendMail function

/*
	@param body: pass in req.body from the original request
		fields: {
					recipient,
					sender,
					didAccept,
					textbook
				}
	@param transporter: nodemailer Transport
	@param callback: callback(error) that handles error
	Formats and send an email based on information in body
*/ 
exports.respond = function (body, transporter, callback) {
	var fields = ['sender', 'recipient', 'didAccept', 'textbook'];
	var errorMessage = '';
	var key = '';

	// Ensure all fields exist
	for (var i = 0; i < fields.length; i++) {
		key = fields[i];
		if (!(key in body)) {
			errorMessage += key + ' missing!;';
		}
	}
	
	if (errorMessage == '') {	
		// Set basic mail options
		var mailOptions = {
			from: 'Deanslist', // Should use process.env
			to: body.recipient,
			subject: 'Dean\'s list offer',
		};

		var message = '';
		message += '<p>Hi!</p>';
		message += '<p>' + body.sender + ' has ';
		if (body.didAccept === true) {
			message += 'accepted ';
		} else {
			message += 'rejected ';
		}
		message += 'your offer for ' + body.textbook;

		mailOptions.html = message;

		transporter.sendMail(mailOptions, function(error, response) {
			console.log(error);
			callback(error);
		});
	} else {
		console.log(errorMessage);
		callback(errorMessage);
	}
};
