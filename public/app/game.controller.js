/**
 * Created by danatubul on 02/06/2017.
 */
angular.module('TicTacToe').controller('GameCtrl',['$scope', '$http', '$timeout', 'GameBoard', function($scope, $http, $timeout, GameBoard) {
  GameBoard.drawBoard();
  updateStats();
  GameBoard.gameEndCallback(function(){
      var playerToUpdate = GameBoard.getWinningPlayer() === 1 ? $scope.playerx : $scope.playero;
      $http.post('/updateStats', {'player' : playerToUpdate}).then(function() {
      updateStats()})
  });

  function updateStats() {
    $scope.leaderboard = [];
    $http.get('/getStats')
      .then(function(data) {
        var scores = data.data.data;
        scores = scores.reduce(function(rv, x) {
          (rv[x["name"]] = rv[x["name"]] || []).push(x);
          return rv;
        }, {});
        for (var score in scores) {
          var currentPlayer = scores[score][0];
          $scope.leaderboard.push(currentPlayer);
        }
      })
  }

  $scope.submit = function(form) {
    $scope.submitted = true;

    if (form.$invalid) {
      return;
    }

    $http.post('/addPlayers', {
      'player1' : $scope.playerx,
      'player2' : $scope.playero})

      .then(function(data, status, headers, config) {
        if (data.status == 200) {
            $scope.submitted = false;
            var currentPlayer = $scope.playerx;
            $scope.message = 'Welcome!,This is ' + (currentPlayer ) + '\'s turn';
            GameBoard.startGame();
            GameBoard.setPlayersNames($scope.playerx,$scope.playero)
        } else {
          $scope.messages = 'Oops, we received your request, but there was an error processing it.';
          $timeout(function() {
            $scope.messages = null;
          }, 3002);
        }
      }, function(data, status, headers, config){
        $scope.progress = data;
        $scope.messages = 'There was a network error. Try again later.';
      })
  };
}]);
