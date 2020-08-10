define([
    'jquery',
    'underscore',
    'backbone'
], function($, _, Backbone){
    var Constants = {
        contextmenuOptions: {
            ENCRYPT_ALL_FOLDER_FILES: 'encrypt all files within folder',
            SELECT_FOLDER_FILES: 'select files of folder to encrypt',
            DECRYPT_FOLDER: 'decrypt folder',
            ENCRYPT_FILE: 'encrypt file',
            DECRYPT_FILE: 'decrypt file'
        }
    };
    
    return Constants;
});