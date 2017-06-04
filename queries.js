/**
 * Created by danatubul on 02/06/2017.
 */

var promise = require('bluebird');
var options = {
  // Initialization Options
  promiseLib: promise
};
var pgp = require('pg-promise')(options);
var connectionString = 'postgres://postgres:sbvyucuk@localhost:5432/statistics';
var db = pgp(connectionString);

function addPlayers(req, res, next) {
  var player1ToInsert = {
    name: req.body.player1,
    wins: 0
  };
  var player2ToInsert = {
    name: req.body.player2,
    wins: 0
  };
  db.none('INSERT INTO users(name, wins) VALUES(${name}, ${wins})', player1ToInsert)
            .then(function (result) {
                db.none('INSERT INTO users(name, wins) VALUES(${name}, ${wins})', player2ToInsert)
                    .then(function (result) {
                        res.status(200)
                            .json({
                                status: 'success',
                                message: 'Inserted two players',
                            });
                    });
            });
}
function updateStats(req, res, next) {
  var playerToUpdate = {
    name: req.body.player
  };
  db.none('UPDATE users SET wins=wins + 1 WHERE name=$1', [playerToUpdate.name])
    .then(function(result) {
        res.status(200)
          .json({
            status: 'success',
            message: 'updated ' + playerToUpdate.name + " wins"
          });
    })
}
function getStats(req, res, next) {
  db.any('SELECT * FROM users')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL users'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}
module.exports = {
  addPlayers: addPlayers,
  updateStats: updateStats,
  getStats: getStats,
};