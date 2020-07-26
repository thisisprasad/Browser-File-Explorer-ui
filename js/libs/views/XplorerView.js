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
    '../config/config'
], function($, _, Backbone, XplorerNavigationView, XplorerItemView, AppController, appConfig){
    var self;
    
    var XplorerView = Backbone.View.extend({
        initialize: function(options) {
            console.log("Initializing File Xplorer...");
            self = this;
            self.options = options;
            self.appController = new AppController({obj: "main"});
            self.render();
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
            
//            console.log("Creating controller");
        },
    });
    
    return XplorerView
});
