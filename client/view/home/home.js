
Session.setDefault('isSignup', true);

Template.home.helpers({
	signup : function () {
		return Session.get('isSignup');
	},
	login : function() {
		return !Session.get('isSignup');
	}
});