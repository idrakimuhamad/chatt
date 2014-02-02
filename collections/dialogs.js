Dialogs = new Meteor.Collection('dialogs');

Dialogs.allow({

	insert: function (userId, doc) {
		return true;
	}

});

Meteor.methods({
	dialog: function (dialogOptions) {
		var chatt = Chatt.findOne({ _id : dialogOptions.chattId});

		if (!dialogOptions.dialog) {
     		throw new Meteor.Error(422, 'It is not a chat if you didn\'t write something, right?');
		}
		if (!chatt) {
      		throw new Meteor.Error(422, 'Nope. Create a chatt session before start chatting.');
		}

		if (Chatt.find({ _id : dialogOptions.chattId,
				"chatters": dialogOptions.chatterId
			}).count() == 0) {

			Chatt.update({ _id : dialogOptions.chattId }, {
				$push : {
					"chatters" : dialogOptions.chatterId
				}
			});
		}

		var dialog = _.extend(_.pick(dialogOptions,
			'_id', 'dialog', 'chattId', 'chatter', 'chatterId'), {
			timestamp : moment().valueOf()
		});

		dialog._id = Dialogs.insert(dialog);

		// createChattNotification(dialog);

		return dialog._id;
	}
});