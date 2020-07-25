define([
    'jquery',
    'underscore',
    'backbone'
], function($, _, Backbone){
    
    var XplorerItem = Backbone.Model.extend({
        defaults: {
            name: '',
            size: '',
            modificationTime: '',
            isFile: ''
        },
        idAttribute: 'name',
        
        initalize: function(options) {
            
        },
        
        htmlString: function(attr) {
            var html = "<li ";
            
            for(key of Object.keys(attr)){
                let str = "";
                switch(key) {
                    case "dataAttr":
                        //  create a data-* for every attribute
                        for(attribute of Object.keys(attr.dataAttr)) {
                            str = " data-"+attribute+"='"+attr[key][attribute]+"' " ; //  purposely using double quotes
                        }
                        html += str;
                        break;
                        
                    default:
                        str = " "+key+"='"+attr[key]+"' ";
                        html += str;
                        break;
                }
            }
            
            html += ' >' + attr.value + '</li>';
            return html;
        }
    });
    
    return XplorerItem;
});