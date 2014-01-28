Accounts.onCreateUser(function(options, user) {

	user.profile = options.profile;

	if(!user.username) {
		user.username = options.profile.name;
	}

	if(user.services.facebook) {
		var facebook = user.services.facebook,
			userId = facebook.id;

		// Get their profile picture
		try {
	    	var profilePic = HTTP.call("GET", "https://graph.facebook.com/" + userId + "/picture?redirect=0&height=200&type=normal&width=200", {
	    		headers : {
	                "Accept" : "application/json",
	                "Accept-Language " : "en_US",
	                "content-type" : "application/x-www-form-urlencoded",
	            },
	    	});

			user.profile.avatar = profilePic.data.data.url;

	    } catch(e) {
	    	alert('Error ' + e.statusCode);
	    }
    }

	// if no user and this is the first one, make it admin
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