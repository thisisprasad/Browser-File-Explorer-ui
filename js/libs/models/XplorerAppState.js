define([
    'jquery',
    'underscore',
    'backbone',
    '../config/Constants'
], function($, _, Backbone, Constants){
    
    var AppState = Backbone.Model.extend({
        defaults: {
            currentDirectory: "/",
            iconViewType: Constants.icon_type.LIST,
        },
        idAttribute: 'currentDirectory',
        
        initialize: function(options) {
            console.log("Creating an App-state variable...");
        }
    });
    
    return AppState;
});