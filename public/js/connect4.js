/**
 * Global namespace for Connect4 app
 */
var C4 = {
    view: {},
    model: {}
};

$(document).ready(function() {
    Utils.debug("Connect4 has started.");

    var gameboard = new C4.view.GameboardView();
});