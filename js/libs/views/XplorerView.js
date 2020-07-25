/**
Definition of File Xplorer view. This is the parent view which contains child views.
*/
define([
    'jquery',
    'underscore',
    'backbone',
    './XplorerNavigationView',
    './XplorerItemView'
], function($, _, Backbone, XplorerNavigationView, XplorerItemView){
    var self;
    
    var XplorerView = Backbone.View.extend({
        initialize: function(options) {
            console.log("Initializing File Xplorer...");
            self = this;
            self.options = options;
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
        }
    });
    
    return XplorerView
});