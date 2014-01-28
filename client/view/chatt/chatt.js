Template.chatt.helpers({
	title : function() {
		return Chatt.find({}).fetch()[0].chatt;
	}
});