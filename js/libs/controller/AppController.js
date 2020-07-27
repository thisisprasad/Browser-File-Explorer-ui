define([
    'jquery',
    'underscore',
    'backbone',
    '../config/Constants',
    '../config/config',
    '../models/XplorerAppState'
], function($, _, Backbone, Constants, appConfig, XplorerAppState) {
    var self;
    
    var AppController = Backbone.View.extend({
        initialize: function(options) {
            self = this;
            self.options = options;
            self.state = new XplorerAppState({});
            Backbone.on(Constants.triggers.UPDATE_CURR_DIRECTORY, this.setCurrentDirectory, this);
            Backbone.on(Constants.triggers.OPEN_DIRECTORY, this.openDirectory, this);
            Backbone.on(Constants.triggers.OPEN_LOCAL_FOLDER, this.openLocalFolder, this);
            console.log("Controller view initialized...");
        },
        
        setCurrentDirectory: function(url, notifyOtherViews) {
            self.state.set('currentDirectory', url);
            Backbone.trigger(Constants.triggers.SET_WORKING_DIRECTORY, url);
            console.log("current working directory: " + self.state.get('currentDirectory'));
        },
                
        openDirectory: function(directoryUrl) {
            $.ajax({
                headers: {
                    'Access-Control-Allow-Credentials' : true,
                    'Access-Control-Allow-Origin':'*',
                    'Access-Control-Allow-Methods':'GET, POST, OPTIONS, PATCH, DELETE'
                },
                url: appConfig.services.OPEN_DIRECTORY + directoryUrl,
                type: "GET",
                crossDomain: true,
                dataType: 'json',
                success: function(data, textStatus, xhr) {
                    Backbone.trigger(Constants.triggers.LOAD_DIRECTORY, data);
                    self.setCurrentDirectory(directoryUrl, true);
                    return ;
                },
                error: function(xhr, textStatus, errorThrown) {
                    alert("error from ajax req.");
                    console.log("ajax error. " + textStatus)
                }
            });
        },
        
        openLocalFolder: function(localFolderName) {
            self.openDirectory(self.state.get('currentDirectory') + "/" + localFolderName);
        }
    });

    return AppController;
});