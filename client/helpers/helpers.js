/**
	Global Helpers Function
*/
var oldTitle = "Chatt - A Stupid Chat App",
	newTitle = "New chatt! | Chatt - A Stupid Chat App",
	isOldTitle = true;

/** To sort Array Object by its timestamps **/
compare = function(a,b) {
	if (a.timestamp < b.timestamp)
		return -1;
	if (a.timestamp > b.timestamp)
		return 1;
	return 0;
}

/** Get Chrome Desktop Notification Permission **/
getNotificationPermission =  function() {
	if (window.webkitNotifications.checkPermission() != 0)
		window.webkitNotifications.requestPermission();
}

createNotification = function(chattId) {
	var interval = null;

	if(window.webkitNotifications) {
		// 0 is PERMISSION_ALLOWED
		if (window.webkitNotifications.checkPermission() == 0) {
			var notify = window.webkitNotifications.createNotification(
			'/images/ajax-loader.gif', 'You got a new Chatt!', '');

			notify.show();

			if (isOldTitle) {
				interval = Meteor.setInterval(changeTitle, 700);
				isOldTitle = !isOldTitle;
			}

			notify.ondisplay = Meteor.setTimeout(function () {
				notify.cancel();
			}, 3000);

			// closing the notification won't mark the message as read
			notify.onclose = function() {

			};

			$(window).focus(function () {
			    Meteor.setTimeout(updateNotify(notify, chattId, interval), 5000);
    			isOldTitle = true;
			});

		} else {
			window.webkitNotifications.requestPermission();
		}
	} else {
		
		if (isOldTitle) {
			interval = Meteor.setInterval(changeTitle, 700);
			isOldTitle = !isOldTitle;
		}

		$(window).focus(function () {
			Meteor.setTimeout(updateNotify(null, chattId, interval), 5000);
			isOldTitle = true;
		});
	}
};

changeTitle = function() {
	if(document.title == oldTitle) {
		document.title = newTitle;
	} else {
		document.title = oldTitle;
	}
}

updateNotify = function(notify, chattId, interval) {
	Meteor.call('notify', chattId, function (error, result) {
        if(!error) {
        	clearInterval(interval);
    		$("title").text(oldTitle);
    		if(notify)
    			notify.cancel();
    		console.log("i'm running");
        }
    });
}