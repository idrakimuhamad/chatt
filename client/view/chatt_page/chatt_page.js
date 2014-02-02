Session.setDefault('chatter', null);
Session.set('current_chatter', null);
Session.setDefault('font_size', 'lower');

Template.chatt_page.rendered = function() {
    $(window).scrollTop($(document).height());

    /*@cc_on
	$('.for-ie').text('Yo IE user. Type in your name at the grey box and press enter. After that, to chat, type in your stuff in the grey box and press enter. Aaaand Chrome is the winner.');
	@*/
}

Template.chatt_page.helpers({
    chatt_name : function() {
        return Chatt.find({ _id : Session.get('current_chatt') },
                { fields : { chat : 1 } }).fetch()[0].chat;
    },
	no_name_yet : function() {
        return Session.equals('chatter', null);
    },
    chatter_name : function() {
        return Session.get('chatter');
    },
    chat : function() {
        var dialogs = Dialogs.find({}, { sort : { timestamp : -1}, limit : 30 }).fetch();
        return dialogs.sort(compare);
    },
    owner : function() {
        if(this.chatterId != Session.get('chatterId')) {
            return 'guest';
        } else {
            return 'mine';
        }
    },
    float_side : function() {
        if(this.chatterId != Session.get('chatterId')) {
            return 'pull-left';
        } else {
            return 'pull-right';
        }
    },
    // find dialogs which is not yet read/seen and give them some love
    seen_status : function() {
        return Notify.find({
            chattId : Session.get('current_chatt'),
            dialogId : this._id,
            chatterId : { $ne : Session.get('chatterId') },
            read : false },
            { sort : { timestamps : -1 }}).count() > 0 ? 'unseen' : '';
    },
    time : function() {
        return moment(this.timestamp).format('hh:mma');
    },
    focus : function() {
        return Session.get('on_focus') ? 'focus' : '';
    },
    connected : function() {
        return Meteor.status().status === "connected" ? '' : 'disable';
    },
    not_connected : function() {
        return Meteor.status().status !== "connected";
    },
    font_state : function() {
        return Session.get('font_size');
    },
    font_size : function() {
        return Session.equals('font_size', 'upper') ? 'large' : 'small';
    },
    new_notification : function() {
        var notify = Notify.find({
                chattId : Session.get('current_chatt'),
                chatterId : { $ne : Session.get('chatterId') },
                read : false },
                { sort : { timestamps : -1 }}),
            notifyCount = notify.count();

        if(Session.get('chatterId') && notifyCount > 0) {
            createNotification(Session.get('current_chatt'));
            return notify;
        }
    },
    count : function() {
        return Notify.find({ chattId : Session.get('current_chatt'), read : false }, { limit : 1, sort : { timestamps : -1 }}).count();
    }

});

Template.chatt_page.events({
    'focus .chatt-input' : function(e,t) {
        Session.set('on_focus', true);
        $(e.currentTarget).select();
    },
    // no account implementation, people stay anonymous.
    // each chatter will be given a unique ID
    // will not carry over when the page refresh and need to reenter their name
	'keyup .add-name' : function(e,t) {
        if(e.which === 13) {
            e.preventDefault();
            var name = t.find('.add-name').value;

            if(name) {
                var chatterId = new Meteor.Collection.ObjectID();
                Session.set('chatter', name);
                Session.set('chatterId', chatterId._str);
            }
        }
    },
    'keyup .chatt-input' : function(e,t) {
        if(e.which == 13) {
            e.preventDefault();
            createDialog(t);
        }
    },
    'click .toggle-text' : function(e,t) {
        e.preventDefault();
        if(Session.get('font_size') === 'upper') {
            Session.set('font_size', 'lower');
        } else {
            Session.set('font_size', 'upper');
        }

    },
    'click .notification-switch' : function(e,t) {
        getNotificationPermission();
    }
});

// window.onunload = function(e) {
//     var newNotification = Notify.find({ chattId : Session.get('current_chatt') }, { limit : 1, sort : { timestamps : -1 }}).fetch(),
//         notifyId = newNotification[0]._id;

//     Meteor.call('notify', notifyId, function (error, result) {
//         if(!error) {

//         }
//     });
// }

function createDialog(template) {
    var dialog = template.find('.chatt-input').value;
    Session.set('dialog_content', dialog);
    $('.chatt-input').val('').select();

    if(dialog) {
        dialogOptions = {
            dialog : dialog,
            chattId : Session.get('current_chatt'),
            chatter : Session.get('chatter'),
            chatterId : Session.get('chatterId')
        }

        Meteor.call('dialog', dialogOptions, function (error, result) {
            if(!error) {
                // Session.set('new_notification', true);
            }
        });
    }
}

