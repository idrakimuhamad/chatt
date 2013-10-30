Session.setDefault('chatt_name', null);
Session.set('current_chatter', null);
//Session.setDefault('new_notification', false);

Template.chatt_page.rendered = function() {
    $(window).scrollTop($(document).height());
    
    /*@cc_on
	$('.for-ie').text('Yo IE user. Type in your name at the grey box and press enter. After that, to chat, type in your stuff in the grey box and press enter. Aaaand Chrome is the winner.');
	@*/
}

Template.chatt_page.helpers({
	no_name_yet : function() {
        return Session.equals('chatt_name', null);
    },
    chatter_name : function() {
        return Session.get('chatt_name');
    },
    chatt : function() {
        var dialogs = Chatt.find({}).fetch();
            dialogs = dialogs[0].dialogs;
        if(dialogs)
            return dialogs;
    },
    time : function() {
        return moment(this.timestamp).format('hh:mma');
    },
//    not_the_current_chatter : function() {
//        
//        if( this.chatter === Session.get('current_chatter') ) {
//            return false;
//        } else {
//            Session.set('current_chatter', this.chatter);
//            return true;
//        }
//    },
    focus : function() {
        return Session.get('on_focus') ? 'focus' : '';
    },
    connected : function() {
        return Meteor.status().status === "connected" ? '' : 'disable';
    },
    not_connected : function() {
        return Meteor.status().status !== "connected";
    }
});

Template.chatt_page.events({
    'focus .chatt-input' : function(e,t) {
        Session.set('on_focus', true);
        $(e.currentTarget).select();
    },
	'keyup .add-name' : function(e,t) {
        if(e.which === 13) {
            e.preventDefault();
            var name = t.find('.add-name').value;
            
            if(name)
                Session.set('chatt_name', name);
        }
    },
    'keyup .chatt-input' : function(e,t) {
        if(e.which == 13) {
            e.preventDefault();
            createDialog(t);
        }
    }
});

function createDialog(template) {
    var dialog = template.find('.chatt-input').value;
    $('.chatt-input').val('').select();
            
    if(dialog) {
        Chatt.update(Session.get('current_chatt'), {
            $push : {
                dialogs : {
                    dialog : dialog,
                    chatter : Session.get('chatt_name'),
                    timestamp : moment().valueOf()
                }
            }
        }, function(err) {
            if(!err) {
//                Session.set('new_notification', true);
            }
        });
    }
}

// little hack for blinking title
//var isOldTitle = true;
//var oldTitle = "Chatt - A Stupid Chat App";
//var newTitle = 'New chatt! | Chatt - A Stupid Chat App';
//var interval = null;
//
//
//
//Meteor.autorun(function() {
//    if(Session.get('new_notification')) {        
//        interval = setInterval(changeTitle, 700);
//    }
//});
//
//function changeTitle() {
//    document.title = isOldTitle ? oldTitle : newTitle;
//    isOldTitle = !isOldTitle;
//}
//
//$(window).focus(function () {
//    clearInterval(interval);
//    Session.set('new_notification', false);
//    $('title').text(oldTitle);
//});