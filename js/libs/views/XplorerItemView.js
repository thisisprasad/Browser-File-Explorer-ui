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
                el: "#item_context_menu"
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
//            self.itemContextView.openContextMenu(event);
            self.openContextMenu(event);
        },
        
        openContextMenu: function(event){
            var contextMenuActive = "context_menu--active";
            var menu = document.querySelector("#item_context_menu");
            menu.classList.add(contextMenuActive);
            console.log("opening context menu...");
            var clickCoords = self._getPosition(event);
            var clickCoordsX = clickCoords.x;
            var clickCoordsY = clickCoords.y;
            
            var menuWidth = menu.offsetWidth + 4;
            var menuHeight = menu.offsetHeight + 4;
            
            var windowWidth = window.innerWidth;
            var windowHeight = window.innerHeight;
            
            if((windowWidth - clickCoordsX) < menuWidth){
                menu.style.left = (windowWidth - menuWidth) - 0 + "px";
            } else {
                menu.style.left = clickCoordsX-0 + "px";
            }
            
            if(Math.abs(windowHeight - clickCoordsY) < menuHeight){
                menu.style.top = (windowHeight - menuHeight)-0 + "px";
            } else {
                menu.style.top = clickCoordsY-0 + "px";
            }
        },
        
        _getPosition: function(e){
            console.log("Inside getPosition");
            var posx = 0, posy = 0;
            if(!e) var e = window.event;
            if(e.pageX || e.pageY){
                posx = e.pageX;
                posy = e.pageY;
            } else if(e.clientX || e.clientY){
                posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
                posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
            }
            
            return {
                x: posx,
                y: posy
            };
        }
    });
    
    return XplorerItemView;
});