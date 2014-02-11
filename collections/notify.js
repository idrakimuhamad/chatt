Notify = new Meteor.Collection('notify'),

Notify.allow({
	// Notification will only be created in the server
	insert : function(userId, doc) {
		return false;
	}

});

createChattNotification = function(dialog) {
	var chatt = Chatt.findOne(dialog.chattId);

	Notify.insert({
		chattId: chatt._id,
		dialogId: dialog._id,
		chatter: dialog.chatter,
		chatterId: dialog.chatterId,
		timestamps : moment().valueOf(),
		read: false
	});
};

Meteor.methods({
	notify: function (id) {
		Notify.update({ chattId : id, read : false}, {
            $set : {
                read : true
            }},
            { multi: true });
	}
});