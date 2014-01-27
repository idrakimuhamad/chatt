Accounts.onCreateUser(function(options, user) {

	user.profile = options.profile || {};

	// if no user and this is the first one, make it admin
	if (options.profile)
		user.profile = options.profile;

	if (Meteor.users.find().count() === 0) {
		user.isAdmin = true;
	}

	return user;

});

Accounts.loginServiceConfiguration.remove({
	service: "facebook"
});

Accounts.loginServiceConfiguration.insert({
	service: "facebook",
	appId: "442878555811876",
	secret: "c470d8bec57e1d1bc49edf5c26dbec79"
});