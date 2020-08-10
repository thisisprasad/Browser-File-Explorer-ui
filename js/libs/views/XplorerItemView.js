define([
    'jquery',
    'underscore',
    'backbone',
    'text!../tpl/XplorerItemViewTemplate.html',
    './XplorerItemContext/XplorerItemContextmenuView',
    '../models/XplorerItem',
    '../collections/XplorerItemCollection',
    '../config/Constants'
], function($, _, Backbone, XplorerItemViewTemplate, ItemContextView, XplorerItem, XplorerItemCollection, Constants){
    var self;
    
    var XplorerItemView = Backbone.View.extend({
        
        initialize: function(options) {
            self = this;
            self.options = options;
            self.itemCollection = null;
            Backbone.on(Constants.triggers.LOAD_DIRECTORY, this.onLoadDirectoryElements, this);
            self.render();
        },
        
        render: function() {
            var template = _.template(XplorerItemViewTemplate);
            self.$el.html(template);
            self.itemContextView = new ItemContextView({ 
//                el: "#item_context_menu"
                el: "#context_region"
            });
            
            console.log("ItemView rendered...");
        },
        
        /**
            This method  loads directory items 
            1. convert raw-data into collection.
            2. Collection of item models is inserted in DOM.
        */
        onLoadDirectoryElements: function(data) {
            if(data.result == false) {
//                alert("Error while scanning directory");
                return ;
            }
            var modelHtml = "";
            //  1.
            self.itemCollection = new XplorerItemCollection();
//            console.log("Ajax data" + JSON.stringify(data));
            data.elements.forEach(function(item, index){
                self.itemCollection.add(new XplorerItem({
                    name: item.name,
                    size: item.size,
                    modificationTime: item.modtime,
                    isFile: item.isfile
                }));
            });
            
            //  2.
            self.$el.find("#items").html("")
            self.itemCollection.each(function(item){
                modelHtml = item.htmlString({
                    class: "xplorer_list_item",
                    value: item.get('name'),
                    dataAttr: {
                        isfile: item.get('isFile')
                    }
                });
                self.$el.find("#items").append(modelHtml);
            });
        },
        
        events: {
            "dblclick .xplorer_list_item": "_openItem",
            "contextmenu .xplorer_list_item": "openItemMenu"
        },
        
        _openItem: function(event) {
            if(event.target.getAttribute("data-isfile") == 'false'){
                //  Open the folder or directory
                Backbone.trigger(Constants.triggers.OPEN_LOCAL_FOLDER, event.target.getAttribute("value"));
            }
            else {
                alert("The app currently does not support Reading and writing files in web-app");
            }
        },
        
        openItemMenu: function(event) {
            self.itemContextView.openContextMenu(event);
        },
        

    });
    
    return XplorerItemView;
});