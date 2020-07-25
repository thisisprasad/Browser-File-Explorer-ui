define([
	'jquery',
	'underscore',
	'backbone'
], function($, _, Backbone){
	var initialize = function(){
		console.log("Initializing app...");
		
		require(['./libs/views/MainView',
                 './libs/views/XplorerView',
                 'text!libs/tpl/XplorerViewTemplate.html'],
            function(MainView, XplorerView, XplorerViewTemplate){
                xplorer = new XplorerView({
                    template: XplorerViewTemplate,
                    el: "body"
                });
            });
	}

	return {
		initApp: initialize
	};
});