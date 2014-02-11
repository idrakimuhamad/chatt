Session.setDefault('last_chatter_dialog', null);

var lastChatterClass = null,
	lastChatter = null,
	lastDialogClass = null,
	lastDialog = null;

Template.chatt.rendered = function () {
	if(!this.rendered) {
		this.rendered = true;
		Session.set('document-title', Chatt.find({}).fetch()[0].chatt);
	}
	$(window).scrollTop($(document).height());
	$('#chatt-entry textarea').focus();
};

Template.chatt.helpers({
	anon_user : function() {
		return Session.get('anon_user');
	},
	title : function() {
		return Chatt.find({}).fetch()[0].chatt;
	},
	dialog : function() {
		var dialogs = Dialogs.find({}, { sort : { timestamp : -1}, limit : 30 }).fetch();
		return dialogs.sort(compare);
	},
	person : function() {
		if(lastChatterClass !== this.chatterId && lastDialogClass !== this._id || lastChatterClass === null ) {
			lastChatterClass = this.chatterId;
			lastDialogClass = this._id;
			return 'different-from-above';
		} else if(lastChatterClass === this.chatterId && lastDialogClass !== this._id){
			return 'same-with-above';
		} else {
			return 'different-from-above';
		}
	},
	same_person : function() {
		if(lastChatter !== this.chatterId && lastDialog !== this._id || lastChatter === null ) {
			lastChatter = this.chatterId;
			lastDialog = this._id;
			return false;
		} else if(lastChatter === this.chatterId && lastDialog !== this._id){
			return true;
		}
	},
	dialog_body : function() {
		var dialog = this.dialog;
		dialog = dialog.replace(':)', '◕ ◡ ◕')
			.replace(':(', '◕︵◕').replace(':|', '(ಠ_ಠ)').replace(':p', ':-þ');
		return dialog;
	}
});

Template.avatar.helpers({
	avatar : function() {
		var user = Meteor.users.findOne(this.chatterId);

		if(user) {
			if(user.profile && user.profile.avatar) {
				return true;
			} else {
				return false;
			}
		}
	},
	avatar_url : function() {
		var user = Meteor.users.findOne(this.chatterId);

		if(user) {
			if(user.profile) {
				var avatar = user.profile.avatar;
				return avatar;
			} else {
				return false;
			}
		}
	},
	first_letter : function() {
		var username = this.chatter;
		return username.charAt(0);
	},
	chatter_name : function() {
		var username = this.chatter;
		return username;
	},
	current_chatter : function() {
		return this.chatterId === Session.get('chatterId') ? 'own-by-me' : '';
	}
});

Template.back_to_dashboard.username = function() {
	if(Meteor.user())
		return Meteor.user().username;
}

