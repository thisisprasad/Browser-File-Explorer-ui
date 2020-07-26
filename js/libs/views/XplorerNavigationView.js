define([
    'jquery',
    'underscore',
    'backbone',
    'text!../tpl/XplorerNavigationViewTemplate.html',
    '../config/config',
    '../models/XplorerItem',
    '../collections/XplorerItemCollection',
    '../config/Constants'
], function($, _, Backbone,
             XplorerNavigationViewTemplate,
             appConfig,
             XplorerItem,
             XplorerItemCollection,
             Constants){
    var self;
    
    var XplorerNavView = Backbone.View.extend({
        initialize: function(options) {
            self = this;
            self.render();
        },
        
        render: function() {
            var template = _.template(XplorerNavigationViewTemplate);
            self.$el.html(template);
        },
        
        events: {
            "keypress #nav_bar_url": "_openDirectory"
        },
        
        _openDirectory: function(event) {
            if(event.which == 13){
                var url = $("#nav_bar_url").val();
                console.log("Triggering...")
                Backbone.trigger(Constants.OPEN_DIRECTORY, url);
            }
        },
    });
    
    return XplorerNavView;
});