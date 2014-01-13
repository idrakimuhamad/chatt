
Chatt = new Meteor.Collection('chatt'),

Chatt.allow({

	insert: function (userId, doc) {
		return true;
	},

	update: function (userId, doc, fields, modifier) {
		return true;
	},

	remove: function (userId, doc) {
		return isAdminById(userId);
	},

});

Meteor.methods({
	chat: function (chat) {
		if (!chat) {
      		throw new Meteor.Error(422, 'A name for this session would be awesome. Thanks.');
		}

		chatt = {
			chat : chat,
			timestamp : moment().valueOf()
		};

		return Chatt.insert(chatt);
	}
});