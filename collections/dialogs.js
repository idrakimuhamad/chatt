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

		var dialog = _.extend(_.pick(dialogOptions,
			'dialog', 'chattId', 'chatter', 'chatterId'), {
			timestamp : moment().valueOf()
		});

		dialog._id = Dialogs.insert(dialog);

		// Instead of updating the last person on chatt,
		// we just filter the notification which wasn't
		// made by the current chatter
		// Chatt.update({_id : dialogOptions.chattId}, {
		// 	$set : {
		// 		lastChatter : dialogOptions.chatterId
		// 	}
		// });

		createChattNotification(dialog);

		return dialog._id;
	}
});