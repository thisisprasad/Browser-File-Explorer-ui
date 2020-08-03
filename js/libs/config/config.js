define(function(){
    var config = {
        services: {
            OPEN_DIRECTORY: "http://localhost:8080/opendir?dirname="
        },
        
        ITEM_VIEW_DEFAULT_CONTEXT_OPTIONS: [
            'open',
            'delete',
            'move',
            'copy',
            'rename',
             'info'
        ]
    };
    
    return config;
});