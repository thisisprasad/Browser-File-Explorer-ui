define([
    'jquery',
    'underscore',
    'backbone',
    './Constants',
    'contextmenuPropModel',
    'AppProps'
], function ($, _, Backbone, Constants, contextmenuPropModel, AppProps) {

    var FileEncApp = {
        /**
         * Initializes the properties of the application
         */
        init: function() {
            console.log("init for app.js");
            this.props = new AppProps();
            this.props.set('appName', Constants.appName);
            this.props.set('hasContextmenuOptions', true);
        },

        getAppProps: function() {
            return this.props;
        },

        /**
         * Returns an array of model: "ContextmenuItemProp".
         */
        getContextmenuOptions: function () {
            let options = [];
            options.push(new contextmenuPropModel({
                'option': Constants.contextmenuOptions.ENCRYPT_FILE,
                'applyToFile': true,
                'applyToFolder': false
            }));

            options.push(new contextmenuPropModel({
                'option': Constants.contextmenuOptions.DECRYPT_FILE,
                'applyToFile': true,
                'applyToFolder': false
            }));

            options.push(new contextmenuPropModel({
                'option': Constants.contextmenuOptions.ENCRYPT_ALL_FOLDER_FILES,
                'applyToFile': false,
                'applyToFolder': true
            }));

            options.push(new contextmenuPropModel({
                'option': Constants.contextmenuOptions.DECRYPT_FOLDER,
                'applyToFile': false,
                'applyToFolder': true
            }));

            options.push(new contextmenuPropModel({
                'option': Constants.contextmenuOptions.SELECT_FOLDER_FILES,
                'applyToFile': false,
                'applyToFolder': true
            }));

           return options;
        },

        execute: function (command) {
            switch (command) {
                case Constants.contextmenuOptions.ENCRYPT_FILE:
                    alert("encrypt file option chosen");
                    break;

                default:
                    alert("Operation not supported");
                    break;
            }
        }
    };

    return FileEncApp;
});
