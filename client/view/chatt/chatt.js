Session.setDefault('last_chatter_dialog', null);

var lastChatter = null;

Template.chatt.rendered = function () {
	setTitle(Chatt.find({}).fetch()[0].chatt);
};

Template.chatt.helpers({
	title : function() {
		return Chatt.find({}).fetch()[0].chatt;
	},
	dialog : function() {
		return Dialogs.find();
	}
	// dialog_cloud : function() {
	// 	if(lastChatter !== this.chatterId || !lastChatter ) {
	// 		lastChatter = this.chatterId;

	// 		var dialogContainer = '<li class="dialog" data-chatter="' + this.chatterId + '"><p>' + this.dialog + '</p></li>';

	// 		return dialogContainer;
	// 	} else {
	// 		$('#dialogs').append('<p>' + this.dialog + '</p>');

	// 		// console.log(this.dialog + ' - same dialog');
	// 		// $('#dialogs').find('[data-chatter="' + this.chatterId + '"]').last().append('<p>' + this.dialog + '</p>');
	// 	}
	// }
	// dialog_content : function() {


	// 	return this.dialog;
	// }
});

Template.dialog_cloud.helpers({
	not_the_same : function() {
		if(lastChatter !== this.chatterId) {
			lastChatter = this.chatterId;
			return true;
		} else {
			$('#dialogs').find('[data-chatter="' + this.chatterId + '"]').last().append('<p>' + this.dialog + '</p>');
			return false;
		}
	}
});