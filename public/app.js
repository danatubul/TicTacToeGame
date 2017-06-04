/**
 * Created by danatubul on 02/06/2017.
 */
'use strict';

angular.module('TicTacToe', ['ui.router']).config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider.state('game', {
    url: '/',
    templateUrl: 'app/game.html',
    controller: 'GameCtrl'
  });

}).run(function () {

});