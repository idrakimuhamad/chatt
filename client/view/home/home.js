
Session.setDefault('isSignup', true);
Session.setDefault('isFlip', true);

Template.home.helpers({
	signup : function () {
		return Session.get('isSignup');
	},
	login : function() {
		return !Session.get('isSignup');
	},
	page_class : function() {
		return Session.get('isSignup') ? 'signup-page' : 'login-page';
	}
});

Template.home.events({
	'tap .signup-footer .to-login, click .signup-footer .to-login' : function(e,t) {
		e.preventDefault();
		$(t.find('.signup')).addClass('flip');
		// Meteor.setTimeout(function () {
			Session.set('isSignup', false);
			// $(t.find('.login')).addClass('flip');
		// }, 250);
	},
	'tap .login-footer .to-signup, click .login-footer .to-signup' : function(e,t) {
		e.preventDefault();
		$(t.find('.login')).addClass('flip');
		// Meteor.setTimeout(function () {
			Session.set('isSignup', true);
			// $(t.find('.signup')).addClass('flip');
		// }, 250);
	}
});