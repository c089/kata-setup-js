var expect = require('chai').expect;
var Game = require("../tennis.js").Game;

describe('tennis match', function () {
    var game;

    beforeEach(function() {
        game = new Game();
    });

    var expectedScoreForGame = function (game, scorePlayer1, scorePlayer2) {
               return expect(game.getScore()).to.deep.equal({pointsPlayer1: scorePlayer1, pointsPlayer2: scorePlayer2});
           };

    it('should report 0-0 as the pointOfPlayer for a new game', function () {
        expectedScoreForGame(game, 0, 0);
    });

    it('should report 0-15 as the pointOfPlayer game, if player2 gets point', function () {
        game.pointForPlayer(2);

        expect(game.getScore()).to.deep.equal({pointsPlayer1: 0, pointsPlayer2: 15});
    });


    it('should report 15-15 as the pointOfPlayer game, if player1 and then player2 get one point each', function () {
        game.pointForPlayer(1)
            .pointForPlayer(2);

        expect(game.getScore()).to.deep.equal({pointsPlayer1: 15, pointsPlayer2: 15});
    });

    it('should report 15-15 as the pointOfPlayer game, if player2 and then player1 get one point each', function () {
        game.pointForPlayer(2)
            .pointForPlayer(1);

        expect(game.getScore()).to.deep.equal({pointsPlayer1: 15, pointsPlayer2: 15});
    });

    it('should report 30-15 as the pointOfPlayer game, if player2 and then player1 then player 1 again get one point each', function () {
        game.pointForPlayer(2)
            .pointForPlayer(1)
            .pointForPlayer(1);

        expect(game.getScore()).to.deep.equal({pointsPlayer1: 30, pointsPlayer2: 15});
    });

    it('should report a win for player 1', function () {
        game.pointForPlayer(1)
            .pointForPlayer(1)
            .pointForPlayer(1)
            .pointForPlayer(1)
            .getScore();
        expect(game.getWinner()).to.equal(1);
    });

});
