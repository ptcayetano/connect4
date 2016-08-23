describe("Gameboard View.", function() {
    var gameboard;

    beforeEach(function() {
        gameboard = new C4.view.GameboardView();
    });

    afterEach(function() {
        $('#gameboard').html('');
    });

    describe("Assigning the correct gameboard", function() {
        it("should not be null", function() {
            expect(gameboard.el).not.toBe(null);
        });

        it("should have value of #gameboard id", function() {
            expect($(gameboard.el).attr('id')).toEqual('gameboard');
        });
    });

    describe("Rendering the correct gameboard elements", function() {
        it("should have the .move-grid elements", function() {
            expect($('#gameboard .move-grid').length).toEqual(7);
        });

        it("should have the .board-row elements", function() {
            expect($('#gameboard .board-row').length).toEqual(6);
        });
    });

    describe("Registering player for the game", function() {
        it("should have player 1", function() {
            expect(gameboard.player1).not.toEqual(null);
        });
        it("should have player 2", function() {
            expect(gameboard.player2).not.toEqual(null);
        });
        it("should have the player1 as first active player", function() {
            expect(gameboard.activePlayer).toEqual(gameboard.player1);
        })
    });

    describe("Mouseover on a .move-grid element", function() {
        var target_grid, dummy_event;

        beforeEach(function() {
            target_grid = $('.move-grid')[1];
            dummy_event = {target: target_grid};
            
        });

        describe("by Player 1", function() {
            it("should have .player1 class on the target grid element", function() {
                gameboard.activePlayer = gameboard.player1;
                gameboard.focusMove(dummy_event);
                expect($(target_grid).hasClass('player1')).toEqual(true);
            });
        });
        describe("by Player 2", function() {
            it("should have .player2 class on the target grid element", function() {
                gameboard.activePlayer = gameboard.player2;
                gameboard.focusMove(dummy_event);
                expect($(target_grid).hasClass('player2')).toEqual(true);
            });
        });
    });

    describe("Making a move", function() {
        var target_grid, dummy_event;

        beforeEach(function() {
            target_grid = $('.move-grid')[1];
            dummy_event = {target: target_grid};
        });

        describe("by Player 1", function() {
            it("should toggle Player 2 as next active player", function() {
                gameboard.activePlayer = gameboard.player1;
                gameboard.makeMove(dummy_event);
                expect(gameboard.activePlayer).toEqual(gameboard.player2);
            });
        });
        describe("by Player 2", function() {
            it("should toggle Player 1 as next active player", function() {
                gameboard.activePlayer = gameboard.player2;
                gameboard.makeMove(dummy_event);
                expect(gameboard.activePlayer).toEqual(gameboard.player1);
            });
        });

        describe("by a player and placing the tokens to gameboard", function() {
            var player_id, gameboard;
            beforeEach(function() {
                gameboard = new C4.view.GameboardView();
                player_id = gameboard.activePlayer.get('id');
                gameboard.placeToken(player_id, 2);
            });

            it("should place on the correct grid", function() {
                expect($("#grid-5-2").data('active')).toEqual(true);
                
            });

            it ("should place the correct token", function() {
                expect($("#grid-5-2").hasClass(player_id)).toEqual(true);
            });
        });

        describe("and checking a winner", function() {
            var player_id, gameboard;
            beforeEach(function() {
                gameboard = new C4.view.GameboardView();
                gameboard.activePlayer = gameboard.player2;
                player_id = gameboard.activePlayer.get('id');
            });

            describe("on horizontal row", function() {
                beforeEach(function() {
                    $("#grid-0-5").data('active', true).addClass(player_id);
                    $("#grid-1-5").data('active', true).addClass(player_id);
                    $("#grid-2-5").data('active', true).addClass(player_id);
                    $("#grid-3-5").data('active', true).addClass(player_id);
                    gameboard.checkWinner();
                });
                it("should determine the winnner", function() {
                    expect(gameboard.winner.id).toEqual(player_id);
                });

                it("should end the game and show the winner", function() {
                    expect($('.infobox').hasClass('hidden')).toEqual(false);
                    expect($('.move-grid').hasClass('hidden')).toEqual(true);
                });
            });
            describe("on vertical", function() {
                beforeEach(function() {
                    $("#grid-2-5").data('active', true).addClass(player_id);
                    $("#grid-2-4").data('active', true).addClass(player_id);
                    $("#grid-2-3").data('active', true).addClass(player_id);
                    $("#grid-2-2").data('active', true).addClass(player_id);
                    gameboard.checkWinner();
                });
                it("should determine the winnner", function() {
                    expect(gameboard.winner.id).toEqual(player_id);
                });
                it("should end the game and show the winner", function() {
                    expect($('.infobox').hasClass('hidden')).toEqual(false);
                    expect($('.move-grid').hasClass('hidden')).toEqual(true);
                });
            });
            describe("on diagonal from top left to bottom right (vice versa)", function() {
                beforeEach(function() {
                    $("#grid-2-0").data('active', true).addClass(player_id);
                    $("#grid-3-1").data('active', true).addClass(player_id);
                    $("#grid-4-2").data('active', true).addClass(player_id);
                    $("#grid-5-3").data('active', true).addClass(player_id);
                    gameboard.checkWinner();
                });
                it("should determine the winnner", function() {
                    expect(gameboard.winner.id).toEqual(player_id);
                });
                it("should end the game and show the winner", function() {
                    expect($('.infobox').hasClass('hidden')).toEqual(false);
                    expect($('.move-grid').hasClass('hidden')).toEqual(true);
                });
            });
            describe("on diagonal from top right to bottom left (vice versa)", function() {
                beforeEach(function() {
                    $("#grid-2-6").data('active', true).addClass(player_id);
                    $("#grid-3-5").data('active', true).addClass(player_id);
                    $("#grid-4-4").data('active', true).addClass(player_id);
                    $("#grid-5-3").data('active', true).addClass(player_id);
                    gameboard.checkWinner();
                });
                it("should determine the winnner", function() {
                    expect(gameboard.winner.id).toEqual(player_id);
                });
                it("should end the game and show the winner", function() {
                    expect($('.infobox').hasClass('hidden')).toEqual(false);
                    expect($('.move-grid').hasClass('hidden')).toEqual(true);
                });
            });
            
        });
    });
});