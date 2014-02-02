Template.chatt_input.rendered = function () {
	// console.log('chatt_input run');
};

Template.chatt_input.helpers({
	avatar_url : function() {
		var userProfile = Meteor.user().profile;

		if(userProfile) {
			var avatar = userProfile.avatar;
			return avatar;
		}
	},
	first_letter : function() {
		var username = Meteor.user().username;

		if(username) {
			return username.charAt(0);
		}
	}
});

Template.chatt_input.events({
	'keydown #chatt-entry textarea': function (e,t) {
		if(e.which == 13) {
			e.preventDefault();

			var dialog = t.find('#chatt-entry textarea').value;
			t.find('#chatt-entry textarea').value = '',
			realId = new Meteor.Collection.ObjectID();

			// console.log(realId);

			if(dialog) {
				dialogOptions = {
					_id : realId._str,
				    dialog : dialog,
				    chattId : Session.get('current_chatt'),
				    chatter : Session.get('chatter'),
				    chatterId : Session.get('chatterId')
				}

				Meteor.call('dialog', dialogOptions, function (error, result) {
				    if(!error) {
				    	console.log(result);
				    }
				});
			}
		}
	}
});