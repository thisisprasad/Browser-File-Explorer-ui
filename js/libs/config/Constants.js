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
            OPEN_LOCAL_FOLDER: 'openLocalFolder'
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
            BACKSPACE: 8
        }
    };
    
    return Constants;
});