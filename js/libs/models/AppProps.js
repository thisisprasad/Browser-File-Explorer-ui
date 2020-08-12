define([
	'jquery',
	'underscore',
	'backbone'
], function ($, _, Backbone) {
	var AppProps = Backbone.Model.extend({
		defaults: {
			appName: '',
			hasContextmenuOptions: false
		},
		idAttribute: 'appName'
	});

	return AppProps;
});