
Router.map(function() {

	this.route('home', {
		path: '/',
		loadingTemplate: 'loading',

		// before : function() {
		// 	if (Meteor.user()) {
		// 		Router.go('dashboard', { username : Meteor.user().username });
		// 	}
		// }
	});

	this.route('dashboard', {
		path: '/dashboard/:username',
		loadingTemplate: 'loading',

		waitOn : function() {
			return [
				Meteor.subscribe('currentUser'),
				Meteor.subscribe('chatt_user_participate', Meteor.userId())
			]
		},
	});

	this.route('chatt', {
		path: '/:chatt',

		data : function() {
			return [
			Chatt.findOne({ chatt : this.params.chatt })
			];
		},

		waitOn: function () {
			return [
			Meteor.subscribe('selected_chatt', this.params.chatt)
			];
		},

		before : function() {
			var chattId = Chatt.findOne({ chatt : this.params.chatt })._id;

			Meteor.subscribe('chatt_dialogs', chattId);
			Meteor.subscribe('notification', chattId);
			Session.set('current_chatt', chattId);
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
	},

	before: function() {
		var routeName = this.route.name;

		// no need to check at these URLs
		if (_.include(['chatt'], routeName))
			return;

		var user = Meteor.user();
		if (!user) {
			this.render(Meteor.loggingIn() ? this.loadingTemplate : 'home');
			return this.stop();
		}
	}
});