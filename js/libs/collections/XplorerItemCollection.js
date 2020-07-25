define([
    'jquery',
    'underscore',
    'backbone',
    '../models/XplorerItem'
], function($, _, Backbone, XplorerItem){
    
    var XplorerItemCollection = Backbone.Collection.extend({
        model: XplorerItem
    });
    
    return XplorerItemCollection;
});