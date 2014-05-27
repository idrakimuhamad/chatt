
Router.map(function() {

	this.route('home', {
		path: '/',
		loadingTemplate: 'loading',

		onBeforeAction : function() {
			if (Meteor.user()) {
				Router.go('dashboard', { username : Meteor.user().username });
			}
		}
	});

	this.route('dashboard', {
		path: '/dashboard/:username',
		loadingTemplate: 'loading',

		data : function() {
			return [
			Chatt.find({ "chatters": Meteor.userId() })
			];
		},

		waitOn : function() {
			return [
				Meteor.subscribe('currentUser'),
				Meteor.subscribe('chatt_user_participate', Meteor.userId())
			]
		},

		onAfterAction : function() {
			if (Meteor.user()) {
				if (Meteor.user().username != this.params.username) {
					Meteor.logout(function() {
						Router.go('home');
					});
				}
			} else if(!Meteor.user()) {
				Router.go('home');
			}
		}
	});

	this.route('profile', {
		path: '/profile',
		loadingTemplate: 'loading',

		data : function() {
			if(Meteor.user())
				return Meteor.user();
		},

		waitOn : function() {
			return [
				Meteor.subscribe('currentUser')
			]
		},

		onAfterAction : function() {
			if (!Meteor.user()) {
				Router.go('home');
			}
		}
	});

	this.route('settings', {
		path: '/settings',
		loadingTemplate: 'loading',

		data : function() {
			if(Meteor.user())
				return Meteor.user();
		},

		waitOn : function() {
			return [
				Meteor.subscribe('currentUser')
			]
		},

		onAfterAction : function() {
			if (!Meteor.user()) {
				Router.go('home');
			}
		}
	});

	this.route('chatt', {
		path: '/:_id',

		data : function() {
			return [
			Chatt.findOne({ _id : this.params._id })
			];
		},

		waitOn: function () {
			return [
			Meteor.subscribe('selected_chatt', this.params._id),
			Meteor.subscribe('chatt_dialogs', this.params._id),
			Meteor.subscribe('user_in_chatt'),
			Meteor.subscribe('notification', this.params._id)
			];
		},

		onAfterAction : function() {
			Session.set('current_chatt', this.params._id);
			if(Meteor.user()) {
				Session.set('chatter', Meteor.user().username);
				Session.set('chatterId', Meteor.userId());
			}
		}
	});

	// this.route('chatt_page', {
	// 	path: '/chat/:_id',

	// 	data : function() {
	// 		return Chatt.findOne(this.params._id);
	// 	},

	// 	waitOn: function () {
	// 		return [ Meteor.subscribe('selected_chatt', this.params._id),
	// 			Meteor.subscribe('chatt_dialogs', this.params._id),
	// 			Meteor.subscribe('notification', this.params._id) ];
	// 	},

	// 	onBeforeAction : function() {
	// 		Session.set('current_chatt', this.params._id);
	// 	}
	// });

	this.route('notFound', { path: '*' });

});

Router.configure({
	layoutTemplate: 'layout',

	notFoundTemplate: 'notFound',

	loadingTemplate: 'loading_normal',

});