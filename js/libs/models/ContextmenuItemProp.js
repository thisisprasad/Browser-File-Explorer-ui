define([
	'jquery',
	'underscore',
	'backbone'
], function ($, _, Backbone) {

	var ContextmenuItemProp = Backbone.Model.extend({
		defaults: {
			applyToFile: false,
			applyToFolder: false,
			option: ''
		},

		idAttribute: 'option',
	});

	return ContextmenuItemProp;
});