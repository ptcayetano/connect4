/** 
 * Global namespace for Utils function
 */
var Utils = {

    debug: function() {
        var t_args = arguments.length;

        for (var x=0; x<t_args; x++) {
            var _msg = arguments[x];
            
            switch(typeof _msg) {
                case 'object':
                    console.dir(_msg);
                break;
                case 'string':
                    console.log(_msg);
                break;
            }
        }
    }
}

String.prototype.replaceAll = function(search, replacement) {
    var word = this;
    return word.replace(new RegExp(search, 'g'), replacement);
}