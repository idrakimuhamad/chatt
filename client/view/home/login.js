
Session.setDefault('login_with_facebook', false);
Session.setDefault('loggin_user', false);

Template.login.helpers({
	login_user : function() {
		return Session.get('loggin_user');
	},
	login_with_facebook : function() {
		return Session.get('login_with_facebook');
	}
});

Template.login.rendered = function () {
	if(!this.rendered) {
		this.rendered = true;
		Session.set('document-title', 'login');
	}
};

Template.login.events({
	'focus .form-control' : function(e,t) {
		$(e.currentTarget).parent('.form-group').addClass('focus');
	},
	'blur .form-control' : function(e,t) {
		$(e.currentTarget).parent('.form-group').removeClass('focus');
	},
	'submit .form' : function(e,t) {
		e.preventDefault();

		var email = t.find('.email').value,
			password = t.find('.password').value;

		Session.set('loggin_user', true);

		Meteor.loginWithPassword(email, password, function(err, res) {
			Session.set('loggin_user', false);
			if(!err) {
				var user = Meteor.user().username;
        		Router.go('dashboard', { username : user });
			}
		});
	},
	'click #log-with-facebook .facebook-button' : function(e,t) {
		e.preventDefault();

		Session.set('login_with_facebook', true);

		Meteor.loginWithFacebook({
			requestPermissions : ['email']
		}, function(err, res) {
			Session.set('login_with_facebook', false);
			if(!err) {
				var user = Meteor.user().username;
				Router.go('dashboard', { username : user });
			}
		});
	}
});