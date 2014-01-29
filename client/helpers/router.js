
Router.map(function() {

	this.route('home', {
		path: '/',
		loadingTemplate: 'loading',

		before : function() {
			// if (Meteor.user()) {
			// 	Router.go('dashboard', { username : Meteor.user().username });
			// }
		}
	});

	this.route('dashboard', {
		path: '/dashboard/:username',
		loadingTemplate: 'loading',

		data : function() {
			return [
			Chatt.find({ "chatters.chatter": Meteor.userId() })
			];
		},

		waitOn : function() {
			return [
				Meteor.subscribe('currentUser'),
				Meteor.subscribe('chatt_user_participate', Meteor.userId())
			]
		},

		before : function() {
			if (Meteor.user().username != this.params.username) {
				Meteor.logout(function() {
					Router.go('home');
				});
			} else if(!Meteor.user()) {
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
			Meteor.subscribe('notification', this.params._id)
			];
		},

		before : function() {
			Session.set('current_chatt', this.params._id);
			Session.set('chatter', Meteor.user().username);
			Session.set('chatterId', Meteor.userId());
		}
	});

	this.route('profile', {
		path: '/profile',
		loadingTemplate: 'loading',

		data : function() {
			return Meteor.user();
		},

		waitOn : function() {
			return [
				Meteor.subscribe('currentUser')
			]
		},

		before : function() {
			if (!Meteor.user()) {
				Router.go('home');
			}
		}
	});

	this.route('settings', {
		path: '/settings',
		loadingTemplate: 'loading',

		data : function() {
			return Meteor.user();
		},

		waitOn : function() {
			return [
				Meteor.subscribe('currentUser')
			]
		},

		before : function() {
			if (!Meteor.user()) {
				Router.go('home');
			}
		}
	});

	this.route('chatt_page', {
		path: '/chat/:_id',

		data : function() {
			return Chatt.findOne(this.params._id);
		},

		waitOn: function () {
			return [ Meteor.subscribe('selected_chatt', this.params._id),
				Meteor.subscribe('chatt_dialogs', this.params._id),
				Meteor.subscribe('notification', this.params._id) ];
		},

		before : function() {
			Session.set('current_chatt', this.params._id);
		}
	});

	this.route('notFound', { path: '*' });

});

Router.configure({
	layoutTemplate: 'layout',

	notFoundTemplate: 'notFound',

	loadingTemplate: 'loading_normal',

	yieldTemplates: {
//    	'footer': { to: 'footer' },
	}
});