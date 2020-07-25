// Require.js allows us to configure shortcut alias
// There usage will become more apparent further along in the tutorial.
require.config({
	paths: {
		jquery: 'libs/jquery/jquery',
		underscore: 'libs/underscore/underscore',
		backbone: 'libs/backbone/backbone',
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
], function(App){
	// The "app" dependency is passed in as "App"
	App.initApp();
	// console.log("Hello from main");
});