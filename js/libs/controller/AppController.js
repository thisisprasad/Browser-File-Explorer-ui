define([
    'jquery',
    'underscore',
    'backbone',
    '../config/Constants',
    '../config/config',
    '../models/XplorerAppState'
], function($, _, Backbone, Constants, appConfig, XplorerAppState) {
    
    var AppController = Backbone.View.extend({
        initialize: function(options) {
            self.state = new XplorerAppState({});
            Backbone.on(Constants.UPDATE_CURR_DIRECTORY, this.setCurrentDirectory, this);
            Backbone.on(Constants.OPEN_DIRECTORY, this.openDirectory, this);
            console.log("Controller view initialized...");
        },
        
        setCurrentDirectory: function(url) {
            self.state.set('currentDirectory', url);
            console.log("current working directory: " + self.state.get('currentDirectory'));
        },
                
        openDirectory: function(directoryUrl) {
            console.log("Console Controller View, url: " + directoryUrl);
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
                    console.log("Triggering from controller");
                    Backbone.trigger(Constants.LOAD_DIRECTORY, data);
                    Backbone.trigger(Constants.UPDATE_CURR_DIRECTORY, directoryUrl);
                    return ;
                },
                error: function(xhr, textStatus, errorThrown) {
                    alert("error from ajax req.");
                    console.log("ajax error. " + textStatus)
                }
            });
        }
    });

    return AppController;
});