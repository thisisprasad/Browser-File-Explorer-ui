define(function(){
    var Constants = {
        icon_type: {
            LIST: 'list',
            THUMBNAILS: 'thumbnails',
            ICONS: 'icons'
        },
        
        triggers: {
            LOAD_DIRECTORY: 'loadDirectoryElements',
            UPDATE_CURR_DIRECTORY: 'updateCurrentDirectory',
            SET_WORKING_DIRECTORY: 'setWorkingDirectory',
            OPEN_DIRECTORY: 'openDirectory',
            OPEN_LOCAL_FOLDER: 'openLocalFolder',
            ESCAPE_PRESS: 'escapePress'
        },
        
        contextmenuOptions: {
            OPEN: 'open',
            DELETE: 'delete',
            MOVE: 'move',
            COPY: 'copy',
            RENAME: 'rename',
            INFO: 'info'
        },
        
        keycodes: {
            BACKSPACE: 8,
            ESCAPE: 27
        }
    };
    
    return Constants;
});