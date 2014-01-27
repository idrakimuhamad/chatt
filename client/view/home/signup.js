Session.setDefault('creating_user', false);

Template.signup.helpers({
	creating_user : function() {
		return Session.get('creating_user');
	}
});

Template.signup.events({
	'focus .form-control' : function(e,t) {
		$(e.currentTarget).parent('.form-group').addClass('focus');
	},
	'blur .form-control' : function(e,t) {
		$(e.currentTarget).parent('.form-group').removeClass('focus');
	},
	'submit .form' : function(e,t) {

		e.preventDefault();

		Session.set('creating_user', true);

		var options = {
			username : t.find('.username').value,
			email : t.find('.email').value,
			password : t.find('.password').value
		};

		Meteor.call('createAccount', options, function (error, result) {
			if(!error) {
				Meteor.loginWithPassword(options.username, options.password, function(err, res) {
					var user = Meteor.user().username;
					Session.set('creating_user', false);
	            	Router.go('dashboard', { username : user });
				});

			} else {
				alert('Oppss! Something went wrong. ' + error.reason);
			}
		});
	},
	'click #sign-with-facebook .facebook-button' : function(e,t) {
		e.preventDefault();

		Meteor.loginWithFacebook({
			requestPermissions : ['email']
		}, function(err, res) {
			if(!err) {}
		});
	}
});