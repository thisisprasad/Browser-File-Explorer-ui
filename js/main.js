// Require.js allows us to configure shortcut alias
// There usage will become more apparent further along in the tutorial.
require.config({
	paths: {
		jquery: 'libs/jquery/jquery',
		underscore: 'libs/underscore/underscore',
		backbone: 'libs/backbone/backbone',
		contextmenuPropModel: 'libs/models/ContextmenuItemProp',
		AppProps: 'libs/models/AppProps',
		AppConfig: '../config/AppConfig',
		Adapter: 'libs/core/Adapter',
		text: "text"
	},

	config: {
		text: {
			useXhr: function(url, protocol, hostname, port) {
				return true;
			}
		}
	}
});

require([
	'app',
	'Adapter'
], function(App, Adapter){
	Adapter.init();
	// The "app" dependency is passed in as "App"
	App.initApp();
});