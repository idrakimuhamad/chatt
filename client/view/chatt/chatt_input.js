Template.chatt_input.helpers({
	avatar_url : function() {
		var userProfile = Meteor.user().profile;

		if(userProfile) {
			var avatar = userProfile.avatar;
			return avatar;
		}
	},
});