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
            Backbone.on(Constants.triggers.SET_WORKING_DIRECTORY, this.setWorkingDirectroy, this);
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
                url = self._validateUrl(url);
                $("#nav_bar_url").val(url);
                Backbone.trigger(Constants.triggers.OPEN_DIRECTORY, url);
            }
        },
        
        setWorkingDirectroy: function(url) {
            self.$el.find("#nav_bar_url").val(url);
        },
        
        _validateUrl: function(url) {
            //  replace backslash with forwardslash.
            //  Multiple backslashes are replaced by single forward slash.
            url = url.replace(/\\+/g, "/");
            if(url[url.length-1] == '/' && url[url.length-2]!=':') url = url.slice(0, -1);
            
            return url;
        }
    });
    
    return XplorerNavView;
});