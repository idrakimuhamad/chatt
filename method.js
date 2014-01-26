
// Create user account
Meteor.methods({
	createAccount : function (options) {

		if (!options) {
     		throw new Meteor.Error(422, 'Fill in the required fill, please.');
		}

		var user = _.extend(_.pick(options,
			'username', 'password', 'email'), {
			created : moment().valueOf()
		});

		var userId = Accounts.createUser(user);

		return userId;
	}
});



		