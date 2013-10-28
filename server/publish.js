Meteor.publish('selected_chatt', function(id) {
    return Chatt.find(id);
})

Meteor.publish('currentUser', function() {
	return Meteor.users.find(this.userId);
});

Meteor.publish('allUsers', function() {

	if (this.userId && isAdminById(this.userId)) {

		// if user is admin, publish all fields
		return Meteor.users.find();

	} else{

		// else, filter out sensitive info
		return Meteor.users.find({}, {fields: {

			isAdmin: false,
			'profile.email': false,

		}});
	}
});
