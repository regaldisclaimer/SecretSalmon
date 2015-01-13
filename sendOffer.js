var exports = module.exports = {}; // Used to export the sendMail function

/*
	@param body: pass in req.body from the original request
		fields: {
					recipient,
					sender,
					message,
					postPath,
					offer,
					textbook
				}
	@param transporter: nodemailer Transport
	@param callback: callback(error) that handles error
	Formats and send an email based on information in body
*/ 
exports.sendMail = function (body, transporter, callback) {
	var fields = ['sender', 'recipient', 'message', 'postPath', 'offer', 'textbook'];
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
			// REMOVE JIM'S EMAIL
			from: 'Deanslist', // Should use process.env
			to: body.recipient,
			subject: 'Dean\'s list offer',
		};

		var message = '';
		message += '<p>Hello!</p>';
		message += '<p>' + body.sender + ' has';
		message += ' made an offer for ' + body.textbook + ': ' + body.offer + '</p>';
		message += '<p>They say:</p>';
		message += '<p>' + body.message + '</p>';
		message += '<hr />'
		message += '<p>To follow up, send an email to ' + body.sender + '.</p>';
		message += '<p>To view your post, go here: ' + body.postPath + '</p>';
		
		mailOptions.html = message;

		transporter.sendMail(mailOptions, function(error, response) {
			// console.log(error);
			callback(error);
		});
	} else {
		console.log(errorMessage);
		callback(errorMessage);
	}
};
