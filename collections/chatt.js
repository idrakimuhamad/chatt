
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
		if (!chat.name) {
      		throw new Meteor.Error(422, 'A name for this session would be awesome. Thanks.');
		}

		var exists = Chatt.find({ chatt : chat.name }).count();

		if(exists > 0) {
			Router.go('chatt', { chatt : chat.name });
		} else {
			var chatt = {
				chatt : chat.name,
				createdBy : chat.userId,
				chatters : {
					chatter : chat.userId
				},
				created : moment().valueOf()
			};
			return Chatt.insert(chatt);
		}
	}
});