Template.chatt_input.helpers({
	avatar_url : function() {
		var userProfile = Meteor.user().profile;

		if(userProfile) {
			var avatar = userProfile.avatar;
			return avatar;
		}
	},
});

Template.chatt_input.events({
	'keydown #chatt-entry textarea': function (e,t) {
		if(e.which == 13) {
			e.preventDefault();

			var dialog = t.find('#chatt-entry textarea').value;
			t.find('#chatt-entry textarea').value = '';

			if(dialog) {
				dialogOptions = {
				    dialog : dialog,
				    chattId : Session.get('current_chatt'),
				    chatter : Session.get('chatter'),
				    chatterId : Session.get('chatterId')
				}

				Meteor.call('dialog', dialogOptions, function (error, result) {
				    if(!error) {
				    }
				});
			}
		}
	}
});