C4.view.GameboardView = (function() {

    // local variables, functions

    /**
     * populate the grid
     */
    var _populateGrid = function(row_count, col_count) {
        var _markup = '', _row = 0, _col = 0;

        var _row_item = "<div class='board-row row'>GRID</div>",
            _grid_item = "<div id='grid-ROW-COL' class='board-grid token-grid border-thin' data-row='ROW' data-col='COL'></div>";

        for (_row=0; _row<row_count; _row++) {
            var _grid = '';

            for (_col=0; _col<col_count; _col++) {
                var _gi = _grid_item.replaceAll('ROW', _row).replaceAll('COL', _col);
                _grid += _gi;
            }
            
            _markup +=  _row_item.replaceAll('GRID', _grid);
        }

        return _markup;
    };

    /**
     * populate the clickable move grid
     */
    var _populateMoveGrid = function() {
        var _move_item = "<div class='move-grid board-grid clickable' data-movenum='MOVE_NUM'></div>",
            _mv = 0, _markup = '';

        for (_mv=0; _mv<7; _mv++) {
            _markup += _move_item.replaceAll('MOVE_NUM', _mv);
        }

        return _markup;
    }

    /**
     * renders info box
     */
    var _renderInfobox = function() {
        return _infobox = "<div class='infobox hidden'></div><div class='play-again clickable hidden'><a href='#'>play again</a></div>";
    }

    /**
     * Gameboard View class
     */
    return Backbone.View.extend({

        el: '#gameboard',

        rowCount: 6,
        colCount: 7,

        player1: null,
        player2: null,

        activePlayer: null,
        winner: null,

        events: {
            "mouseover .move-grid": "focusMove",
            "mouseout .move-grid": "outMove",
            "click .move-grid": "makeMove",
            "click .play-again a": "reset"
        },

        initialize: function() {
            Utils.debug("Initializing GameboardView.");

            _.bindAll(this, "render", "placeToken", "registerPlayer", "makeMove", "focusMove", "outMove", "checkWinner", "announceWinner");

            this.registerPlayer();
            this.render();
        },

        render: function() {
            Utils.debug("Rendering GameboardView.");

            var board = _renderInfobox() + _populateMoveGrid() + _populateGrid(this.rowCount, this.colCount);

            $(this.el).html(board);
        },

        reset: function(e) {
            $('.board-grid.token-grid').data('active', false).removeClass('player1 player2');
            $('.move-grid').removeClass('hidden');
            $('.infobox').addClass('hidden').html('');
            $('.play-again').addClass('hidden');

            this.winner = null;
            this.activePlayer = this.player1;

            Utils.debug("The game was reset!");
        },

        registerPlayer: function() {
            this.player1 = new C4.model.Player({name: "Player 1", id: "player1", color: "#3399ff"});
            this.player2 = new C4.model.Player({name: "Player 2", id: "player2", color: "#ff9900"});

            this.activePlayer = this.player1;

            this.listenTo(this.player1, "move", this.placeToken);
            this.listenTo(this.player2, "move", this.placeToken);
        },

        checkWinner: function() {
            var current_class = this.activePlayer.get('id'),
                score = 0,
                combi = "";

            var _checkGrid = function(grid) {
                return _cur.data('active') && _cur.hasClass(current_class);
            }
                
            // check vertical
            for (var y=0; y<this.colCount; y++) {
                score = 0;
                combi = "";
                for (var x=0; x<this.rowCount; x++) {
                    var _cur = this.getGrid(x,y);
                    if (_cur.length > 0) {
                        if (_checkGrid(_cur)) {
                            combi += x + "," + y + " | ";
                            score++;
                        } else {
                            combi = "";
                            score=0;
                        }
                    }

                    if (score == 4) {
                        Utils.debug("Winning combination: " + combi);
                        return this.announceWinner();
                    }
                }
            }

            // check horizontal
            for (var x=0; x<this.rowCount; x++) {
                score = 0;
                combi = "";
                for (var y=0; y<this.colCount; y++) {
                    var _cur = this.getGrid(x, y);
                    if (_cur.length > 0) {
                        if (_checkGrid(_cur)) {
                            combi += x + "," + y + " | ";
                            score++;
                        } else {
                            combi = "";
                            score=0;
                        }
                    }

                    if (score == 4) {
                        Utils.debug("Winning combination: " + combi);
                        return this.announceWinner();
                    }
                }
            }

            // diagonal, top-left to bottom-right
            for (var x=0; x<this.rowCount; x++) {
                var r=x;
                combi = "";
                score=0;
                for (var c=0; c<this.colCount; c++) {
                    var _cur = this.getGrid(r, c);
                    
                    if (_cur.length > 0) {
                        if (_checkGrid(_cur)) {
                            combi += r + "," + c + " | ";
                            score++;
                        } else {
                            combi = "";
                            score=0;
                        }
                    }

                    if (score == 4) {
                        Utils.debug("Winning combination: " + combi);
                        return this.announceWinner();
                    }
                    
                    r++;
                }
            }
            for (var y=0; y<this.colCount; y++) {
                combi = "";
                score = 0;
                var c=y+1;
                for (var x=0; x<this.rowCount; x++) {
                    var _cur = this.getGrid(x, c);
                    
                    if (_cur.length > 0) {
                        if (_checkGrid(_cur)) {
                            combi += x + "," + c + "|";
                            score++;
                        } else {
                            combi = "";
                            score = 0;
                        }
                    }
                    
                    if (score == 4) {
                        Utils.debug("Winning combination: " + combi);
                        return this.announceWinner();
                    }

                    c++;
                }
            }
            
            // check diagonal top right to bottom left
            for (var x=0; x<this.rowCount; x++) {
                var r=x;
                score = 0;
                combi = 0;
                for (var y=this.colCount-1; y>=0; y--) {
                    var _cur = this.getGrid(r,y);

                    if (_cur.length > 0) {
                        if (_checkGrid(_cur)) {
                            combi += r + "," + y + "|";
                            score++;
                        } else {
                            combi = "";
                            score = 0;
                        }
                    }

                    if (score == 4) {
                        Utils.debug("Winning combination: " + combi);
                        return this.announceWinner();
                    }
                    
                    r++;
                }
            }
            var c=this.colCount-1;
            for (var x=0; x<=this.rowCount; x++) {
                score = 0;
                combi = "";
                
                var r=0;
                for (var y=c; y>=0; y--) {
                    var _cur = this.getGrid(r,y);
                    if (_cur.length > 0) {
                        if (_checkGrid(_cur)) {
                            combi += r + "," + y + "|";
                            score++;
                        } else {
                            combi = "";
                            score = 0;
                        }
                    }
                    r++;
                }

                if (score == 4) {
                    Utils.debug("Winning combination: " + combi);
                    return this.announceWinner();
                }
                c--;
                
            }

            // check if the game is a draw
            var total_grid = $(".board-grid.token-grid").length;
            var total_occupied_player1 = $(".board-grid." + this.player1.id).length;
            var total_occupied_player2 = $(".board-grid." + this.player2.id).length;
            if (total_grid == total_occupied_player1 + total_occupied_player2) {
                // it's a draw
                this.announceDraw();
            }
        },

        toggleInfobox: function(msg) {
            if (msg) {
                $('.move-grid').addClass('hidden');
                $('.infobox').removeClass('hidden').html(msg);
                $('.play-again').removeClass('hidden');
            }
        },

        announceWinner: function() {
            this.winner = this.activePlayer;
            var msg = this.winner.get("name") + " wins!"
            
            Utils.debug(msg);
            
            this.toggleInfobox(msg);
            return this.winner;
        },

        announceDraw: function() {
            var msg = "It's a draw!"
            this.winner = null;

            Utils.debug(msg);
            this.toggleInfobox(msg)
            return this.winner;
        },

        placeToken: function(player_id, column) {
            $(".move-grid").removeClass(player_id);

            var current_row = this.rowCount - 1;
            var row = current_row;
            for (row = current_row; row>-1; row--) {
                var grid = this.getGrid(row,column),
                    active_class = player_id;
                if (!grid.data('active')) {
                    grid.addClass(active_class).data('active', true);
                    Utils.debug(this.activePlayer.get('name') + "'s token was placed at " + row + "," + column);
                    this.checkWinner();
                    break;
                }
            }

            this.activePlayer = (player_id === "player1") ? this.player2 : this.player1;
        },

        focusMove: function(e) {
            if (this.winner) {
                return;
            }
            var _id = this.activePlayer.get("id");
            $(e.target).addClass(_id);
        },

        outMove: function(e) {
            if (this.winner) {
                return;
            }
            var _id = this.activePlayer.get("id");
            $(e.target).removeClass(_id);
        },

        makeMove: function(e) {
            if (this.winner) {
                return;
            }
            var column = $(e.target).data("movenum");
            if (column >= 0) {
                this.activePlayer.move(column);
            }
        },

        getGrid: function(row, col) {
            return $("#grid-" + row + "-" + col);
        }
    });
})();
