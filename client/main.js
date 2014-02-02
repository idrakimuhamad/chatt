Meteor.startup(function() {
	Meteor.autorun(function() {
		document.title = Session.get('document-title') + ' · Chatto';
	});
});