var weirdTennisPointValues = {
    0: 0,
    1: 15,
    2: 30,
    3: 40
};

var Game = function () {

    this.pointOfPlayer = {
        1: 0,
        2: 0
    };
};

Game.prototype.getScore = function () {
    return {
        pointsPlayer1: pointsToScore(this.pointOfPlayer[1]),
        pointsPlayer2: pointsToScore(this.pointOfPlayer[2])
    };
};

Game.prototype.pointForPlayer = function (playerNumber) {
    this.pointOfPlayer[playerNumber]++;
    return this;
};

Game.prototype.getWinner = function () {
    //TODO: to implement it
    return 1;
};

var pointsToScore = function (points) {
    return weirdTennisPointValues[points];
};

module.exports.Game = Game;
