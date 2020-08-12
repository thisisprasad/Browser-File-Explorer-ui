define([
    'jquery',
    'underscore',
    'backbone',
    'AppConfig'
], function ($, _, Backbone, AppConfig) {
    var self;
    var Adapter = {
        init: function (options) {
            console.log("Initialing Adapter...");
            self = this;
            this.options = options;
            this.appStore = new Map();
            this._scanApplications();
        },

        /**
         * Reads the configuration file of the project.
         * Stores a key-value pair of application name and it's instance.
         */
        _scanApplications: function () {
            for (appProp of AppConfig.apps) {
                require(['../apps/' + appProp.name + '/app'], function (app) {
                    if(app.init !== undefined)
                        app.init();
                    self.appStore.set(appProp.name, app);
                    return app;
                });
            }
            console.log("require done");
        },

        getAppInstance: function (appName) {
            return self.appStore.get(appName);
        }
    };

    return Adapter;
});