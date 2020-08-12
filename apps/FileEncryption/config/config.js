define([
    'jquery',
    'underscore',
    'backbone',
    '../Constants'
], function($, _, Backbone, Constants){
    var config = {
        appName: Constants.appName,

        contextmenuOptions: {
            defaultOptions: [],
            runtimeOptions: [
                Constants.contextmenuOptions.ENCRYPT_ALL_FOLDER_FILES,
                Constants.contextmenuOptions.SELECT_FOLDER_FILES,
                Constants.contextmenuOptions.DECRYPT_FOLDER,
                Constants.contextmenuOptions.ENCRYPT_FILE,
                Constants.contextmenuOptions.DECRYPT_FILE
            ]
        }
    };
    
    return config;
});
