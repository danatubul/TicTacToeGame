/**
 * Created by danatubul on 02/06/2017.
 */

angular.module('TicTacToe').factory('GameBoard', function() {
    var gameEndCB;
    var player1name;
    var player2name;
    var gameStarted;
    function drawBoard() {
    var canvas, c;
    canvas = document.getElementById('gameBoard'),
    c = canvas.getContext('2d'),
    msg = document.getElementById('message'),
    EMPTY = 0, X = 1, O = -1;
    var board = [
      0, 0, 0,
      0, 0, 0,
      0, 0, 0,
    ],
    winPatterns = [
        0b111000000, 0b000111000, 0b000000111,
        0b100100100, 0b010010010, 0b001001001,
        0b100010001, 0b001010100,
      ],
    cellSize = 100;
    canvas.width = canvas.height = 3 * cellSize;
    c.clearRect(0, 0, canvas.width, canvas.height);
    currentPlayer = X,
    isGameOver = false;

    function play(cell) {
      if (isGameOver) return;
      if (board[cell] != EMPTY) {
        msg.textContent = 'This Position is taken';
        return;
      }
      board[cell] = currentPlayer;
      if (checkWin(currentPlayer) != 0) {
        isGameOver = true;
        onWin();
        msg.textContent = ((currentPlayer == X) ? player1name : player2name) + ' wins!';
        return;
      } else if (board.indexOf(EMPTY) == -1) {
        isGameOver = true;
        onWin();
        msg.textContent = 'This is a Tie!';
        return;
      }
      currentPlayer *= -1;
      displayTurn();
    }

    function checkWin(player) {
      var BitMask = 0;
      for (var i = 0; i < board.length; i++) {
        BitMask <<= 1;
        if (board[i] == player)
          BitMask += 1;
      }
      for (var i = 0; i < winPatterns.length; i++) {
        if ((BitMask & winPatterns[i]) == winPatterns[i]) {
          return winPatterns[i];
        }
      }
      return 0;
    }

    canvas.addEventListener('click', function(e) {
      if (!gameStarted) {
        return;
      }
      var click = {};
      click.x = e.pageX - canvas.offsetLeft;
      click.y = e.pageY - canvas.offsetTop;
      play(getCell(click.x, click.y));
    }, false);

    function getCoords(cell) {
        var x = (cell % 3) * cellSize,
            y = Math.floor(cell / 3) * cellSize;

        return {
            'x': x,
            'y': y,
        };
    };
    function getCell(x, y) {
      return (Math.floor(x / cellSize) % 3) + Math.floor(y / cellSize) * 3;
    };

    displayTurn();
    function displayTurn() {
      msg.textContent = 'This is ' + ((currentPlayer == X) ? player1name : player2name) + '\'s turn';
    }

    c.strokeStyle = 'White';
    c.lineWidth = 10;

    c.beginPath();
    c.moveTo(cellSize, 0);
    c.lineTo(cellSize, canvas.height);
    c.stroke();

    c.beginPath();
    c.moveTo(cellSize * 2, 0);
    c.lineTo(cellSize * 2, canvas.height);
    c.stroke();

    c.beginPath();
    c.moveTo(0, cellSize);
    c.lineTo(canvas.width, cellSize);
    c.stroke();

    c.beginPath();
    c.moveTo(0, cellSize * 2);
    c.lineTo(canvas.width, cellSize * 2);
    c.stroke();

    init();

    function init() {
      c.strokeStyle = 'CornflowerBlue';
      c.lineWidth = 8;
      for ( i = 0; i < board.length; i++) {
        var coords = getCoords(i);
        c.save();
        c.translate(coords.x + cellSize / 2, coords.y + cellSize / 2);
        if (board[i] == X) {
          drawX();
        } else if (board[i] == O) {
          drawO();
        }
        c.restore();
      }

      function drawX() {
        c.beginPath();
        c.moveTo(-cellSize / 3, -cellSize / 3);//draw /
        c.lineTo(cellSize / 3, cellSize / 3);
        c.moveTo(cellSize / 3, -cellSize / 3);//draw \
        c.lineTo(-cellSize / 3, cellSize / 3);
        c.stroke();
      }
      function drawO() {
        c.beginPath();
        c.arc(0, 0, cellSize / 3, 0, Math.PI * 2);// draw 0
        c.stroke();
      }
      requestAnimationFrame(init);
    }
  }
  function onWin() {
    gameEndCB();
  }
  function gameEndCallback(callback) {
    gameEndCB = callback;
  }
  function setPlayersNames(player1,player2) {
        player1name = player1;
        player2name = player2;
  }
  function getWinningPlayer() {
    return currentPlayer;
  }

  function startGame() {
      gameStarted = true;
  }

  return {
    drawBoard: drawBoard,
    gameEndCallback: gameEndCallback,
    getWinningPlayer: getWinningPlayer,
    setPlayersNames : setPlayersNames,
    startGame: startGame
  };
});
