const gameBoard = (() => {
  'use strict';
  const boardBox = document.querySelectorAll('.box');
  const boardContainer = document.querySelector('.game-board');
  let board = [];

  //factory function for players
  function playerFactory(marker, turn) {
    return {
      marker,
      turn,
    };
  }

  const player1 = playerFactory('X', true);
  const player2 = playerFactory('O', false);
  const AI = playerFactory('O', false);
  const whosTurn = document.querySelector('.turn-indicator');
  let winner = null;

  //allow players to place mark given it's their turn
  const playerMark = function () {
    boardBox.forEach((box) => {
      box.addEventListener('click', () => {
        //player 1 turn
        if (box.innerText === '' && player1.turn === true && winner === null) {
          whosTurn.innerText = 'Player 2 (O), make your move';
          box.innerText = player1.marker;
          board.push(player1.marker);
          player1.turn = false;
          player2.turn = true;
          if (board.length > 4) {
            isXwinner();
          }
          //just realized player 1 goes first and last, player 2 has it rough in tictactoe
          if (board.length == 9 && winner === null) {
            whosTurn.innerText = "It's a DRAW!";
            whosTurn.style.color = 'yellow';
            pvpButton.style.display = 'none';
          }
          //player 2 turn
        } else if (
          box.innerText === '' &&
          player2.turn === true &&
          winner === null
        ) {
          whosTurn.innerText = 'Player 1 (X), make your move';
          box.innerText = player2.marker;
          board.push(player2.marker);

          player2.turn = false;
          player1.turn = true;
          if (board.length > 4) {
            isOwinner();
          }
        }
      });
    });
  };

  //allow user to choose human or AI opponent
  const resetButton = document.querySelector('.reset');
  const pvpButton = document.querySelector('.pvp');
  const aiButton = document.querySelector('.ai');

  const chooseMode = (function () {
    const buttons = document.querySelectorAll('button');
    // whosTurn.innerText = 'Choose your mode';
    aiButton.disabled = false;
    pvpButton.disabled = false;
    resetButton.disabled = true;

    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        // if ((button.innerText = 'PVP')) {
        //   console.log('why');
        //   boardContainer.classList.remove('deactivate');
        //   playerMark();
        //   whosTurn.innerText = 'Player 1 (X), make your move';
        //   pvpButton.disabled = true;
        //   aiButton.disabled = true;
        // } else
        if (button.innerText === 'AI') {
          AImode();
          console.log('hello?');
          aiButton.disabled = true;
          pvpButton.disabled = true;
        }
        pvpButton.style.display = 'none';
        aiButton.style.display = 'none';
      });
    });
  })();

  const winningConditions = [
    [boardBox[0], boardBox[1], boardBox[2]],
    [boardBox[3], boardBox[4], boardBox[5]],
    [boardBox[6], boardBox[7], boardBox[8]],
    [boardBox[0], boardBox[3], boardBox[6]],
    [boardBox[1], boardBox[4], boardBox[7]],
    [boardBox[2], boardBox[5], boardBox[8]],
    [boardBox[0], boardBox[4], boardBox[8]],
    [boardBox[2], boardBox[4], boardBox[6]],
  ];

  //could've use factory func here too
  function isX(item) {
    let answer = item.innerText === 'X';
    return answer;
  }

  function isO(item) {
    let answer = item.innerText === 'O';
    return answer;
  }

  //checks if any of the winning conditons have all Xs
  const isXwinner = function () {
    winningConditions.forEach((condition) => {
      if (condition.every(isX)) {
        console.log('X has won', condition);
        condition.forEach((letter) => {
          letter.style.color = '#7fff00';
        });

        winner = true;
        whosTurn.innerText = 'Player 1 (X) has WON!';
      }
    });
    resetButton.disabled = false;
  };

  //checks if any of the winning conditons have all Os
  const isOwinner = function () {
    winningConditions.forEach((condition) => {
      if (condition.every(isO)) {
        console.log('O has won');
        winner = true;
        whosTurn.innerText = 'Player 2 (O) has WON!';
        condition.forEach((letter) => {
          letter.style.color = '#7fff00';
        });
      }
    });
    resetButton.disabled = false;
  };

  //resetting letter styling back to normal from green(win)/yellow(draw)
  function isResetting() {
    winningConditions.forEach((condition) => {
      condition.forEach((letter) => {
        letter.style.color = '#fff';
      });
    });
    resetButton.innerText = 'RESET';
    whosTurn.style.color = '#fff';
    boardContainer.classList.add('deactivate');
  }

  function boardReset() {
    //clear board array
    board.length = 0;
    let i = 0;
    boardBox.forEach((box) => {
      box.innerText = '';
      i++;
    });

    console.log(board);
    player1.turn = true;
    player2.turn = false;
    winner = null;

    resetButton.disabled = true;
    pvpButton.disabled = false;
    aiButton.disabled = true;

    pvpButton.style.display = 'inline-block';
    aiButton.style.display = 'inline-block';
    whosTurn.innerText = 'Choose your mode';

    isResetting();
  }

  resetButton.addEventListener('click', boardReset);

  function AImode() {
    boardBox.forEach((box) => {
      box.addEventListener('click', () => {
        //player 1 turn
        if (box.innerText === '' && player1.turn === true && winner === null) {
          box.innerText = player1.marker;
          board.push(player1.marker);
          player1.turn = false;
          AI.turn = true;

          aiFindBox();

          board.push(AI.marker);
          AI.turn = false;
          player1.turn = true;
          if (board.length > 4) {
            isXwinner();
          }
          if (board.length == 9 && winner === null) {
            whosTurn.innerText = "It's a DRAW!";
            whosTurn.style.color = 'yellow';
            pvpButton.style.display = 'none';
          }
          //AI turn
          // } else if (
          //   box.innerText === '' &&
          //   AI.turn === true &&
          //   winner === null
          // ) {
          //   aiFindBox();
          //   board.push(AI.marker);
          //   AI.turn = false;
          //   player1.turn = true;
        }
      });
    });
  }

  function aiFindBox() {
    let box = Math.floor(Math.random() * 9);
    let newBox = [];
    if (boardBox[box].innerText === '') {
      return (boardBox[box].innerText = AI.marker);
    } else {
      for (let i = 0; i < boardBox.length; i++) {
        if (boardBox[i].innerText === '') {
          newBox.push(boardBox[i]);
        }
      }
    }
    console.log(newBox);
    if (board.length <= 8) {
      return (newBox[0].innerText = AI.marker);
    }
  }
})();
