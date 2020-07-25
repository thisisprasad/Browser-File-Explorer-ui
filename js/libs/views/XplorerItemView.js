define([
    'jquery',
    'underscore',
    'backbone',
    'text!../tpl/XplorerItemViewTemplate.html',
    '../collections/XplorerItemCollection'
], function($, _, Backbone, XplorerItemViewTemplate, XplorerItemCollection){
    var self;
    
    var XplorerItemView = Backbone.View.extend({
        
        initialize: function(options) {
            self = this;
            self.options = options;
            self.options.itemCollection = null;
            Backbone.on('loadDirectoryElements', this.onLoadDirectoryElements, this);
            self.render();
        },
        
        render: function() {
            var template = _.template(XplorerItemViewTemplate);
            self.$el.html(template);
            
            console.log("ItemView rendered...");
        },
        
        onLoadDirectoryElements: function(items) {
            var modelHtml = "";
            
            self.$el.find("#items").html("")
            items.each(function(item){
                modelHtml = item.htmlString({
                    class: "xplorer_item_list",
                    value: item.get('name'),
                    dataAttr: {
                        isfile: item.get('isFile')
                    }
                });
                self.$el.find("#items").append(modelHtml);
                
                console.log("model html: " + modelHtml);
            });
        }
    });
    
    return XplorerItemView;
});