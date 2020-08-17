define([
    'jquery',
    'underscore',
    'backbone',
    '../../config/config',
    '../../config/Constants',
    'text!../../tpl/XplorerItemContextmenuTemplate.html',
    'AppConfig',
    'Adapter',
    'contextmenuPropModel'
], function ($, _, Backbone, config, Constants,
    ItemContextTemplate, AppConfig, Adapter, contextmenuPropModel) {
    var self;

    var ItemContextView = Backbone.View.extend({

        events: {
            "click .menu_option": "menuAction"
        },

        initialize: function (options) {
            self = this;
            self.options = options;
            self.menu = null;
            self.contextmenuState = false; //  It is off or not displayed currently on the screen.
            self.contextMenuActiveClass = "context_menu--active";
            self.disableOptionClass = "disable-option"
            self.appContextmenuOptionsMap = new Map();
            Backbone.on(Constants.triggers.ESCAPE_PRESS, this.closeMenu, this);
            // self._integrateAppOptions();
            console.log("ItemContextMenuView initialized...");
            self.render();
        },

        /**
            Creates options list from config in DOM.
            Attaches default option and applications specified in config.
            Also integrate 3rd party app options.
        */
        render: function () {
            var template = _.template(ItemContextTemplate);
            self.$el.html(template);
            var html = "";
            var defaultOptions = [];
            for (option of config.ITEM_VIEW_DEFAULT_CONTEXT_OPTIONS) {
                // html += self._generateOptionHtml(option);
                defaultOptions.push(new contextmenuPropModel({
                    applyToFile: true,
                    applyToFolder: true,
                    option: option
                }));
            }
            self._registerDefaultContextmenuOptionsInView(defaultOptions)
            self._addDefaultContextmenuOptionsInDOM(Constants.contextmenuOptions.DEFAULT);
            // self._addListItemHTMLInContextmenu("<hr>");
            self.menu = document.querySelector("#item_context_menu");
            // self.$el.find("#item_context_menu_options").append(html);
            self.$el.find("#item_context_menu_options").css("display", "block");
            self._integrateAppOptions();
        },

        menuAction: function (event) {
            alert("option clicked");
        },

        _addListItemHTMLInContextmenu: function (html) {
            self.$el.find("#item_context_menu_options").append(html);
        },

        /**
            Read the configuration file of project/application. Adds required options of other apps
            in contextmenu.
        */
        _integrateAppOptions: function () {
            for (appProp of AppConfig.apps) {
                let app = Adapter.getAppInstance(appProp.name);
                let appContextmenuOptions = app.getContextmenuOptions();
                //  Add the options into contextmenu DOM.
                self._registerContextmenuOptionsInView(appContextmenuOptions, appProp.name);
                self._addContextmenuOptionsInDOM(appProp.name);
            }
        },

        _registerDefaultContextmenuOptionsInView: function (defaultOptions) {
            self.appContextmenuOptionsMap.set(Constants.DEFAULT_APP, new Set());
            defaultOptions.forEach(function (defaultOption) {
                self.appContextmenuOptionsMap.get(Constants.DEFAULT_APP).add(defaultOption);
            });
        },

        _addDefaultContextmenuOptionsInDOM: function () {
            var html = "";
            var appName = Constants.DEFAULT_APP;
            for (let option of self.appContextmenuOptionsMap.get(appName)) {
                html += " <li data-option='" + option.get('option') + "' "
                    + " class='menu_option' data-app='" + appName + "'"
                    + " data-applyToFile='" + option.get('applyToFile') + "' "
                    + " data-applyToFolder='" + option.get('applyToFolder') + "' "
                    + " data-optionType='" + Constants.contextmenuOptions.OPTION_TYPE.DEFAULT + "' "
                    + " > "
                    + option.get('option') + " </li> ";
            }
            self._addListItemHTMLInContextmenu(html);
        },

        _registerContextmenuOptionsInView: function (contextmenuOptions, appName) {
            self.appContextmenuOptionsMap.set(appName, new Set());
            contextmenuOptions.forEach(function (option) {
                self.appContextmenuOptionsMap.get(appName).add(option);
            });
        },

        _addContextmenuOptionsInDOM: function (appName) {
            var html = "";
            for (let option of self.appContextmenuOptionsMap.get(appName)) {
                html += " <li data-option='" + option.get('option') + "' "
                    + " class='menu_option disable-option' data-app='" + appName + "'"
                    + " data-applyToFile='" + option.get('applyToFile') + "' "
                    + " data-applyToFolder='" + option.get('applyToFolder') + "' "
                    + " data-optionType='" + Constants.contextmenuOptions.OPTION_TYPE.THIRD_PARTY_APP + "' "
                    + " > "
                    + option.get('option') + " </li> ";
            }
            self._addListItemHTMLInContextmenu(html);
        },

        closeMenu: function () {
            self.menu.classList.remove(self.contextMenuActiveClass);
            //  Disable all the options of 3rd-party options
            self.$el.find("#item_context_menu_options").children().toArray()
                .forEach(function (val, idx) {
                    val.classList.add(self.disableOptionClass);
                });
            self.contextmenuState = false;
        },

        /**
         * This method enables/disables the options for a particular item.
         * Traverse the <li> of DOM.
         */
        _enableApplicationItemOptions: function (event) {
            let isfile = (event.target.getAttribute('data-isfile') == 'true') ? true : false;
            let children = self.$el.find("#item_context_menu_options").children().toArray();
            if (isfile) {
                children.forEach(function (val, idx) {
                    if (val.getAttribute('data-applytofile') == 'true') {
                        val.classList.remove(self.disableOptionClass);
                    }
                });
            }
            else {
                children.forEach(function (val, idx) {
                    if (val.getAttribute("data-applytofolder") == 'true') {
                        val.classList.remove(self.disableOptionClass);
                    }
                });
            }
        },

        openContextMenu: function (event) {
            event.preventDefault();
            if (self.contextmenuState == true)
                self.closeMenu();
            self.menu.classList.add(self.contextMenuActiveClass);
            self._enableApplicationItemOptions(event);
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
            self.contextmenuState = true;
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
            html += " <li data-option='" + option + "' class='menu_option disable-option' data-app='default' >" + option + " </li> ";
            return html;
        }
    });

    return ItemContextView;
});