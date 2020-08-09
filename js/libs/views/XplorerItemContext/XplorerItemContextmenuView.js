define([
    'jquery',
    'underscore',
    'backbone',
    '../../config/config',
    '../../config/Constants',
    'text!../../tpl/XplorerItemContextmenuTemplate.html'
], function($, _, Backbone, config, Constants, ItemContextTemplate){
    var self;
    
    var ItemContextView = Backbone.View.extend({
        
        initialize: function(options){
            self = this;
            self.options = options;
            console.log("ItemContextMenuView initialized");
            self.render();
        },
        
        /**
            Creates options list from config in DOM.
        */
        render: function() {
            var template = _.template(ItemContextTemplate);
            self.$el.html(template);
            var html = "";
            for(option of config.ITEM_VIEW_DEFAULT_CONTEXT_OPTIONS) {
                html += self._generateOptionHtml(option);
            }
            self.$el.find("#item_context_menu_options").append(html);
            self.$el.find("#item_context_menu_options").css("display", "block");
        },
        
        openContextMenu: function(event){
            var contextMenuActive = "context_menu--active";
            var menu = document.querySelector("#item_context_menu_options");
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
        },
        
        _generateOptionHtml: function(option) {
            console.log("option: " + option + " html to be created");
            
            var html = "";
            html += " <li data-option='"+option+"' class='menu_option' >" + option + " </li> ";
            return html;
        }
    });
    
    return ItemContextView;
});