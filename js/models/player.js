C4.model.Player = (function() {

    return Backbone.Model.extend({
        
        defaults: {
            name: "Player 1",
            id: "player1",
            color: "#3399ff"
        },

        move: function(column) {
            Utils.debug(this.get("name") + " makes a move at column " + column);
            this.trigger("move", this.get("id"), column);
        }
    });
})();