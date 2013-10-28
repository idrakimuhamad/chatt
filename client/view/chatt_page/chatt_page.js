Session.setDefault('chatt_name', null);

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
    }
});

Template.chatt_page.events({
    'focus .chatt-input' : function(e,t) {
        $(t.find('#chatt-input')).addClass('focus');
    },
	'keyup .add-name' : function(e,t) {
        if(e.which === 13) {
            e.preventDefault();
            var name = t.find('.add-name').value;
            
            if(name)
                Session.set('chatt_name', name);
        }
    },
    'keyup .chat-input' : function(e,t) {
        if(e.which === 13) {
            e.preventDefault();
            createDialog(t);
        }
    }
});

function createDialog(template) {
    var dialog = template.find('.chatt-input').value;
            
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
                template.find('.chat-inputt').value = '';
                template.find('.chat-inputt').focus();
            }
        });
    }
}