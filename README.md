This is a very simple API server to support the Dean's List project. It provides two routes:

POST /createUser
	{
		email: TUFTS_EMAIL_STRING
	}

	This route requires a single field, email. The email address must be a valid tufts email. The server will use the Firebase API to create an account for the given email address, and then send a confirmation/password reset email to that address.

POST /sendOffer
	{
		sender: SENDER_EMAIL_STRING,
		recipient: RECIPIENT_EMAIL_STRING,
		message: MESSAGE_BODY_STRING,
		postPath: LINK_TO_RELEVANT_POST
	}

	Formats and sends an email to "recipient", informing them that a user has made an offer on their posted product. Currently uses SendGrid to distribute emails.