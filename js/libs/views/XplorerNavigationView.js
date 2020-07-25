define([
    'jquery',
    'underscore',
    'backbone',
    'text!../tpl/XplorerNavigationViewTemplate.html',
    '../config/config',
    '../models/XplorerItem',
    '../collections/XplorerItemCollection'
], function($, _, Backbone, XplorerNavigationViewTemplate, appConfig, XplorerItem, XplorerItemCollection){
    var self;
    
    var XplorerNavView = Backbone.View.extend({
        initialize: function(options) {
            self = this;
            self.render();
        },
        
        render: function() {
            var template = _.template(XplorerNavigationViewTemplate);
            self.$el.html(template);
            console.log("Navigation view rendered...");
        },
        
        events: {
            "keypress #nav_bar_url": "_openDirectory"
        },
        
        _openDirectory: function(event) {
            if(event.which == 13){
                var url = $("#nav_bar_url").val();
                $.ajax({
                    headers: {
                        'Access-Control-Allow-Credentials' : true,
                        'Access-Control-Allow-Origin':'*',
                        'Access-Control-Allow-Methods':'GET, POST, OPTIONS, PATCH, DELETE',
//                        'Access-Control-Allow-Headers':'application/json',
                    },
                    url: appConfig.services.OPEN_DIRECTORY + url,
                    type: "GET",
                    crossDomain: true,
                    dataType: 'json',
                    success: function(data, textStatus, xhr) {
                        console.log("AJAX data: " + JSON.stringify(data));
                        //  Backbone.trigger('loadDirectoryElements', data);
                        self._notifyItemViewForCollection(data);
                    },
                    error: function(xhr, textStatus, errorThrown) {
                        alert("error from ajax req.");
                        console.log("ajax error. " + textStatus)
                    }
                });
            }
        },
        
        /**
            Creates collection of XplorerItem and triggers an event on Backbone event-bus
        */
        _notifyItemViewForCollection: function(data) {
            var itemCollection = new XplorerItemCollection();
            
            data.elements.forEach(function(item, index){
                itemCollection.add(new XplorerItem({
                    name: item.name,
                    size: item.size,
                    modificationTime: item.modtime,
                    isFile: item.isfile
                }));
            });
            Backbone.trigger('loadDirectoryElements', itemCollection);
        }
    });
    
    return XplorerNavView;
});