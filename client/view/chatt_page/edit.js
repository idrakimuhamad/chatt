
Template.edit.helpers({
	summary : function() {
		var summary = this.description.replace(/\r?<br>/g, '\n');
		return summary;
	},
	details : function() {
		var sol = this.solution.replace(/\r?<br>/g, '\n');

		return sol;
	},
	tag : function() {        
        var tags = this.tag;
        
        $.each(tags, function(i,v) {
             Tag.insert({
                tag_name : v
            });
        });
        
        return Tag.find();
	}
});

Template.edit.events({
    'keyup, keydown .kb-tag' : function(e,t) {
		if (e.type === "keyup" && e.which === 188) {

			var tag = $('.kb-tag').val().replace(',', '');
			if(tag) {
				Tag.insert({
					tag_name : tag
				},function(err,res) {
					if(res) {
						$('.kb-tag').val('').select();
					}
				});
			}

			e.preventDefault();

		} else if ( e.which == 13 ) {
			return false;
		}
	},
	'blur .kb-tag' : function() {
		$('.kb-tag').val('');
	},
	'click .tag .cancel' : function(e,t) {
		e.preventDefault();
		var tag = $(e.currentTarget).parent().data('tag');
		if(tag) {
			Tag.remove(tag,function(err,res) {
				if(res) {

				}
			});
		}
	},
    'click .submit .cancel' : function(e,t) {
        e.preventDefault();
		Router.go('dashboard');
        Tag.remove({});
    },
    'click .btn-success' : function(e,t) {
        e.preventDefault();
        
        var title = $('.kb-title').val(),
			description = $('.description textarea').val().replace(/\r?\n/g, '<br>'),
            descriptionMarked = marked($('.description textarea').val()),
			solution = $('.solution textarea').val().replace(/\r?\n/g, '<br>'),
            solutionMarked = marked($('.solution textarea').val()),
			tags = Tag.find().fetch(),
			count = 0,
            currentKB = Session.get('current_kb');

		// console.log(title + ',' + description + ',' + solution  + ',' + tags);

		if(title && description && solution && tags.length) {

//			var slug = URLify2(title, 50),
//				exists = KB.find({ urlSlug : slug}).count();

			KB.update({ _id : currentKB }, {
                
                $set: {
                    title : title,
                    description : description,
                    description_marked : descriptionMarked,
                    solution : solution,
                    solution_marked : solutionMarked,
                    date_modified : moment().valueOf(),
                    tag : []
                }

			}, function(err, result) {

				if(!err) {
					for (var i = 0; i < tags.length; i++) {

						KB.update({ _id : currentKB }, {
                           $push : {
                                tag : tags[i].tag_name
                            }
						});

//						console.log(tags[i].tag_name);

						var find = Tags.findOne({ tag : tags[i].tag_name });

						if(!find) {
							console.log("no duplicate for " + find);
							Tags.insert({ tag : tags[i].tag_name })
						}

						count++;

						if(count === tags.length) {
							Router.go('dashboard');
                            Tag.remove({});
						}
					}
				} else {
					alert("Opps, something went wrong. " + err.reason);
				}

			});
		} else {
            alert("Woah hang on cowboy! There're some information you need to enter first before we can share this to others. Make sure that you fill in the title, descriptions, solutions and also tags");
        }
    }
})