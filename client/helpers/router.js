
Router.map(function() {

	this.route('create_session', {
		path: '/',
		loadingTemplate: 'loading',
	});

	this.route('chatt_page', {
		path: '/chat/:_id',

		data : function() {
			return Chatt.findOne(this.params._id);
		},

		waitOn: function () {
			return Meteor.subscribe('selected_chatt', this.params._id);
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
});