/**
Definition of File Xplorer view. This is the parent view which contains child views.
This view also acts as the controller for the entire project.
*/
define([
    'jquery',
    'underscore',
    'backbone',
    './XplorerNavigationView',
    './XplorerItemView',
    '../controller/AppController',
    '../config/config',
    '../config/Constants'
], function($, _, Backbone, XplorerNavigationView, XplorerItemView, AppController, appConfig, Constants){
    var self;
    
    var XplorerView = Backbone.View.extend({
        
        events: {
            "keydown div#xplorer_container": "keypressListeners",
            "contextmenu #item_page": "openGeneralItem"
        },
        
        openGeneralItem: function(event) {
            event.preventDefault();
        },
        
        initialize: function(options) {
            console.log("Initializing File Xplorer...");
            self = this;
            self.options = options;
            self.navView = null;
            self.itemView = null;
            self.appController = null;
            self.render();
//            self.initializeEventListeners();
        },
        
        keypressListeners: function(event) {
            switch(event.which){
                case Constants.keycodes.ESCAPE:
                    //  communicate this event across child views
                    Backbone.trigger(Constants.triggers.ESCAPE_PRESS);
                    break;
            }
        },
        
        render: function() {
            var template = _.template(self.options.template);
            self.$el.html(template);
            console.log("Xplorer view rendered...");
            self.renderChildViews();
        },
        
        renderChildViews: function() {
            self.navView = new XplorerNavigationView({
                el: "#nav_bar",
            });
            
            self.itemView = new XplorerItemView({
                el: "#item_page"
            });
            self.appController = new AppController({});
//            console.log("Creating controller");
        },
    });
    
    return XplorerView
});
