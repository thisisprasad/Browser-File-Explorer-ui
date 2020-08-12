define([
    'jquery',
    'underscore',
    'backbone',
    '../../config/config',
    '../../config/Constants',
    'text!../../tpl/XplorerItemContextmenuTemplate.html',
    'AppConfig',
    'Adapter'
], function ($, _, Backbone, config, Constants, ItemContextTemplate, AppConfig, Adapter) {
    var self;

    var ItemContextView = Backbone.View.extend({

        initialize: function (options) {
            self = this;
            self.options = options;
            self.menu = null;
            self.contextMenuActiveClass = "context_menu--active";
            Backbone.on(Constants.triggers.ESCAPE_PRESS, this.closeMenu, this);
            // self._integrateAppOptions();
            console.log("ItemContextMenuView initialized...");
            self.render();
        },

        /**
            Creates options list from config in DOM.
            Attaches default option and applications specified n config.
        */
        render: function () {
            var template = _.template(ItemContextTemplate);
            self.$el.html(template);
            var html = "";
            for (option of config.ITEM_VIEW_DEFAULT_CONTEXT_OPTIONS) {
                html += self._generateOptionHtml(option);
            }
            html += "<hr>";
            self.menu = document.querySelector("#item_context_menu");
            self.$el.find("#item_context_menu_options").append(html);
            self.$el.find("#item_context_menu_options").css("display", "block");
            self._integrateAppOptions();
        },

        /**
            Read the configuration file of project/application. Adds required options of other apps
            in contextmenu.
        */
        _integrateAppOptions: function () {
            for (appProp of AppConfig.apps) {
                let app = Adapter.getAppInstance(appProp.name);
                let appContextmenuOptions = app.getContextmenuOptions();
                console.log("app ke options, model ka array: " +
                    JSON.stringify(appContextmenuOptions));
                //  Add the options into contextmenu DOM.
            }
        },

        closeMenu: function () {
            self.menu.classList.remove(self.contextMenuActiveClass);
        },

        openContextMenu: function (event) {
            event.preventDefault();
            self.menu.classList.add(self.contextMenuActiveClass);
            var clickCoords = self._getPosition(event);
            var clickCoordsX = clickCoords.x;
            var clickCoordsY = clickCoords.y;

            var menuWidth = self.menu.offsetWidth + 4;
            var menuHeight = self.menu.offsetHeight + 4;

            var windowWidth = window.innerWidth;
            var windowHeight = window.innerHeight;

            if ((windowWidth - clickCoordsX) < menuWidth) {
                self.menu.style.left = (windowWidth - menuWidth) - 0 + "px";
            } else {
                self.menu.style.left = clickCoordsX - 0 + "px";
            }

            if (Math.abs(windowHeight - clickCoordsY) < menuHeight) {
                self.menu.style.top = (windowHeight - menuHeight) - 0 + "px";
            } else {
                self.menu.style.top = clickCoordsY - 0 + "px";
            }
        },

        _getPosition: function (e) {
            var posx = 0, posy = 0;
            if (!e) var e = window.event;
            if (e.pageX || e.pageY) {
                posx = e.pageX;
                posy = e.pageY;
            } else if (e.clientX || e.clientY) {
                posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
                posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
            }

            return {
                x: posx,
                y: posy
            };
        },

        _generateOptionHtml: function (option) {
            console.log("option: " + option + " html to be created");

            var html = "";
            html += " <li data-option='" + option + "' class='menu_option' >" + option + " </li> ";
            return html;
        }
    });

    return ItemContextView;
});