
Session.setDefault('login_with_facebook', false);

Template.login.helpers({
	// creating_user : function() {
	// 	return Session.get('creating_user');
	// },
	login_with_facebook : function() {
		return Session.get('login_with_facebook');
	}
});

Template.login.rendered = function () {
	setTitle('Log In');
};

Template.login.events({
	'focus .form-control' : function(e,t) {
		$(e.currentTarget).parent('.form-group').addClass('focus');
	},
	'blur .form-control' : function(e,t) {
		$(e.currentTarget).parent('.form-group').removeClass('focus');
	},
	'click #log-with-facebook .facebook-button' : function(e,t) {
		e.preventDefault();

		Session.set('login_with_facebook', true);

		Meteor.loginWithFacebook({
			requestPermissions : ['email']
		}, function(err, res) {
			if(!err) {
				Session.set('login_with_facebook', false);
				var user = Meteor.user().username;
				Router.go('dashboard', { username : user });
			}
		});
	}
});