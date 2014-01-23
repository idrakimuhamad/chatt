
Session.setDefault('isSignup', true);

Template.home.helpers({
	signup : function () {
		return Session.get('isSignup');
	},
	login : function() {
		return !Session.get('isSignup');
	}
});

Template.signup.events({
	'focus .form-control' : function(e,t) {
		$(e.currentTarget).parent('.form-group').addClass('focus');
	},
	'blur .form-control' : function(e,t) {
		$(e.currentTarget).parent('.form-group').removeClass('focus');
	}
})