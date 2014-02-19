Template.chatt_input.rendered = function () {
	// console.log('chatt_input run');
};

Template.chatt_input.helpers({
	got_account : function() {
		return Meteor.user();
	},
	name : function() {
		if(Session.get('chatter')) {
			return Session.get('chatter');
		}
	},
	avatar_url : function() {
		if(Meteor.user()) {
			var userProfile = Meteor.user().profile;

			if(userProfile) {
				var avatar = userProfile.avatar;
				return avatar;
			}
		}
	},
	first_letter : function() {
		if(Session.get('chatter')) {
			var username = Session.get('chatter');
			return username.charAt(0);
		}
	},
	anon_user_signup : function() {
		return Session.get('anon_user_signup');
	},
	is_anon_user : function() {
		return Session.get('anon_user');
	}
});

Template.chatt_input.events({
	'click .anonymous' : function(e,t) {
		e.preventDefault();
		Session.set('anon_user_signup', true);
	},
	'keydown .anon-name' : function(e,t) {
		if(e.which == 13) {
			e.preventDefault();

			var anonName = t.find('.anon-name').value,
				anonId = Meteor.Collection.ObjectID();

			Session.set('chatter', anonName);
			Session.set('chatterId', anonId);

			Session.set('anon_user_signup', false);
			Session.set('anon_user', true);
		}
	},
	'keyup #chatt-entry textarea' : function(e,t) {

	},
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