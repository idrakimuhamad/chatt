Template.sidebar.helpers({
	username : function() {
		return Meteor.user().username;
	},
	avatar_url : function() {
		var userProfile = Meteor.user().profile;

		if(userProfile) {
			var avatar = userProfile.avatar;
			return avatar;
		}
	},
});

Template.sidebar.events({	
	'click .logout' : function(e,t) {
		e.preventDefault();
		Meteor.logout(function() {
			Router.go('home');
		});
	}
});