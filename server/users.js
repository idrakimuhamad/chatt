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