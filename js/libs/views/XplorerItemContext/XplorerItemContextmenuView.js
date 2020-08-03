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
        },
        
        _generateOptionHtml: function(option) {
            console.log("option: " + option + " html to be created");
            
            var html = "";
            html += " <li data-option='"+option+"' >" + option + " </li> ";
            return html;
        }
    });
    
    return ItemContextView;
});