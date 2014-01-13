
Template.create_session.events({
    'keyup #create-chatt' : function(e,t) {
        if(e.which === 13) {
            e.preventDefault();
            createChatt(t);
        }
    },
    'submit #create-chatt' : function(e,t) {
        e.preventDefault();
        createChatt(t);
    }
});

function createChatt(template) {

    var chatt_name = template.find('.chat-name').value;

    if(chatt_name) {

        Meteor.call('chat', chatt_name, function (error, result) {
            if(!error) {
                Router.go('chatt_page', { _id : result });
            }
        });

    }
}