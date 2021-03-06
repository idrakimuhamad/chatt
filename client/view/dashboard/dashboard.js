Session.setDefault('creating_chatt', false);

Template.dashboard.rendered = function () {
	if(!this.rendered) {
		this.rendered = true;
		Session.set('document-title', 'Dashboard');
	}
};

Template.dashboard.helpers({	
	no_chat : function() {
		return Chatt.find({}).count() > 0 ? false : true;
	},
	creating_chatt : function() {
		return Session.get('creating_chatt');
	},
	chatt : function() {
		return Chatt.find({});
	},
	chatt_name : function() {
		return this.chatt;
	},
	last_chat : function() {
		if(this.lastMessage) {
			return this.lastMessage;
		} else {
			var created = moment(this.created).format("YYYYMMDD");
			return moment(created, "YYYYMMDD").fromNow();
		}
	}
});

Template.dashboard.events({
	'keyup .create-chatt .chatt-name': function (e,t) {
		if(e.which == 13) {
			e.preventDefault();

			Session.set('creating_chatt', true);

			var options = {
				name : t.find('.chatt-name').value,
				userId : Meteor.userId()
			};

			if(options) {
				Meteor.call('chat', options, function (error, result) {
					if(!error && result) {
						Meteor.setTimeout(function () {
							Session.set('creating_chatt', false);
							Router.go('chatt', { _id : result });
						}, 500);
					} else if(!result) {
						var chattId = Chatt.find({ chatt : options.name })._id;
						Router.go('chatt', { _id : chattId });
					}
				});

			}
		}
	}
});