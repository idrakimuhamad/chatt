Session.setDefault('enable_notification', 'disabled');

Template.chatt_options.helpers({
	notification_status: function () {
		var notify = Notify.find({
                chattId : Session.get('current_chatt'),
                chatterId : { $ne : Session.get('chatterId') },
                read : false },
                { sort : { timestamps : -1 }});
		var notifyCount = notify.count();

        if(Session.get('chatterId') && notifyCount > 0) {
            createNotification(Session.get('current_chatt'));
        }

        return Session.get('enable_notification');
	}
});

Template.chatt_options.events({
	'click .options .notification' : function(e,t) {
		e.preventDefault();
		
		if(Session.get('enable_notification') !== 'enabled') {
			Session.set('enable_notification', 'disabled');
		} else {
			Session.set('enable_notification', 'enabled');
		}		
        getNotificationPermission();
    }
});