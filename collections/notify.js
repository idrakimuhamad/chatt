Notify = new Meteor.Collection('notify'),
    
Notify.allow({

	insert: function (userId, doc) {
		// the user must be logged in, and they're the admin
//		return (userId && isAdminById(userId));
        return false;
	},

	update: function (userId, doc, fields, modifier) {
		// admin can only change
//		return isAdminById(userId);
        return false;
	},

	remove: function (userId, doc) {
		// only admin can remove
//		return isAdminById(userId);
        return false;
	},

});