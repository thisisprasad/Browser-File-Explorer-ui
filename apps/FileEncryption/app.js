define([
    'jquery',
    'underscore',
    'backbone',
    './Constants'
], function($, _, Backbone, Constants){
    var FileEncApp = {
        execute: function(command) {
            switch(command) {
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
