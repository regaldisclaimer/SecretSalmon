var exports = module.exports = {}

/*
	@param body: req.body
	@param fbRef: firebase ref, passed from app.js after creation
	@param callback: callback(error) to handle error
	Registers user with a random password, then sends a password reset email.
	This functions as a confirmation email.
*/
exports.registerUser = function (body, fbRef, callback) {
	var error = false; // NOTE: probably can move to just using errorMessage
	var errorMessage = '';

	// Check for email field
	console.log(body);
	var emailAddress = body.email;
	if (!emailAddress) {
		error = true;
		errorMessage = 'No Email In Body';
	}

	// Check that email is for Tufts
	if (!error) {
		var segments = emailAddress.split('@');
		if (segments[segments.length - 1] != 'tufts.edu') {
			error = true;
			errorMessage = 'Invalid Email';
		}
	}

	// create random alphanumeric temporary password
	var charPool = 'abcedefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
	var genPass = '';
	for(var i=0; i<20; i++){
		genPass += charPool[Math.floor(Math.random()*63)];
		$(document).ready(function(){
			$('p').text(genPass);
		});
	}


	// deal with firebase createuser
	if (!error) {
		fbRef.createUser({ email: emailAddress, password: genPass }, function (err) {
			if (err) {
				error = true;
				errorMessage = error;
			}
		});
	}

	// firebase user reset PW
	if (!error) {
		fbRef.resetPassword({ email: emailAddress }, function (err) {
			if (err) {
				error = true;
				errorMessage = error;
			}
		});
	}

	// Callback
	callback(errorMessage);
}