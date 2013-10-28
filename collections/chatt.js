
Chatt = new Meteor.Collection('chat'),
    
Chatt.allow({

	insert: function (userId, doc) {
		// the user must be logged in, and they're the admin
//		return (userId && isAdminById(userId));
        return true;
	},

	update: function (userId, doc, fields, modifier) {
		// admin can only change
//		return isAdminById(userId);
        return true;
	},

	remove: function (userId, doc) {
		// only admin can remove
//		return isAdminById(userId);
        return true;
	},

});