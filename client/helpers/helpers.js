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
	if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission(function (permission) {

      // Whatever the user answers, we make sure we store the information
      if(!('permission' in Notification)) {
        Notification.permission = permission;
      }

      // If the user is okay, let's create a notification
      if (permission === "granted") {
        var notification = new Notification("Notification Enabled");
      }
    });
  } else if (Notification.permission === "granted") {
    // If it's okay let's create a notification
    var notification = new Notification("Notification Enabled");
  }
}

createNotification = function(chattId) {
	var interval = null;

	if("Notification" in window) {
		if (Notification.permission === "granted") {
			var notify = new Notification("You got a new Chatt!", {
				icon : "/images/ajax-loader.gif"
			});

			if (isOldTitle) {
				interval = Meteor.setInterval(changeTitle, 700);
				isOldTitle = !isOldTitle;
			}

			notify.onshow = Meteor.setTimeout(function () {
				notify.close();
			}, 3000);

			// closing the notification won't mark the message as read
			notify.onclose = function() {

			};

			$(window).focus(function () {
    			$("title").text(oldTitle);
        		clearInterval(interval);
    			notify.close()
    			$('.dialog').removeClass('unseen').delay(200).queue(function() {
					$(this).dequeue();
				    Meteor.setTimeout(function() {
				    	updateNotify(chattId);
			   		}, 3000);
				});
    			isOldTitle = true;
			});

		} else {
			getNotificationPermission();
		}
	} else {

		if (isOldTitle) {
			interval = Meteor.setInterval(changeTitle, 700);
			isOldTitle = !isOldTitle;
		}

		$(window).focus(function () {
			$("title").text(oldTitle);
    		clearInterval(interval);
    		$('.dialog').removeClass('unseen').delay(200).queue(function() {
				$(this).dequeue();
			    Meteor.setTimeout(function() {
			    	updateNotify(chattId);
			    }, 3000);
			});
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

updateNotify = function(chattId) {
	Meteor.call('notify', chattId, function (error, result) {
    if(!error) {
    }
	});
}