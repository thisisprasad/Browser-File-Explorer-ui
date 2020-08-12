define([
    'jquery',
    'underscore',
    'backbone',
    '../apps/FileEncryption/Constants.js'
], function ($, _, Backbone, FileEncConst) {
    var AppConfig = {
        name: "FileXplorer",
        version: "1.0",
        apps: [
            {
                name: "FileEncryption",
                contextmenu: {
                    "is-present": true
                }
            },
        ]
    }

    return AppConfig;
});
