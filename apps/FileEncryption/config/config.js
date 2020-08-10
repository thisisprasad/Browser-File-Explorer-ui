define([
    'jquery',
    'underscore',
    'backbone'
], function($, _, Backbone){
    var config = {
        contextmenuOptions: {
            defaultOptions: [],
            runtimeOptions: [
                "encrypt all files within folder",
                "select files"
            ]
        }
    };
    
    return config;
});
