define([
	'jquery',
	'underscore',
	'backbone'
], function($, _, Backbone){
	var self;

	var MainView = Backbone.View.extend({
        
		initialize: function(options){
			self = this;
			self.options = options;
			console.log("MainView is initialized");

			this.render();
		},

		render: function(){
            console.log("self.el: ", self.$el);
			console.log("$el.html: ", self.$el.html());
			console.log("Rendering the MainView. self.options.element: ", self.options.template);
			var template = _.template(self.options.template, {});
			self.$el.html(template);
            console.log("After attaching template $el.html: ", self.$el.html());
		}
	});

	return MainView;
});