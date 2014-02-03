Template.profile.helpers({
	user: function () {
		if (Meteor.user()) {
			return Meteor.user();
		};
	},
	email : function() {
		if(this.services.facebook) {
			return this.services.facebook.email;
		} else if(this.emails) {
			return this.emails[0].address;
		}
	},
	fname : function() {
		if(this.services.facebook) {
			return this.services.facebook.first_name;
		} else if(this.profile.firstName) {
			return this.profile.firstName;
		}
	},
	lname : function() {
		if(this.services.facebook) {
			return this.services.facebook.last_name;
		} else if(this.profile.lastName) {
			return this.profile.lastName;
		}
	}
});
