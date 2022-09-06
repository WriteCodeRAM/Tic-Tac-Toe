const gameBoard = (() => {
  'use strict';
  const boardBox = document.querySelectorAll('.box');
  const boardContainer = document.querySelector('.game-board');
  let board = [];
  let gameOver = false;
  let winner = null;

  //allows us to add box to specific function so we can remove the exact event listener dynamically
  const boxFunctions = [];

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

  const whoseTurn = document.querySelector('.turn-indicator');

  // ----------------------------PVP LOGIC--------------------------------------- //
  //allow players to place mark given it's their turn
  function PVPLogic() {
    for (let i = 0; i < boardBox.length; i++) {
      boxFunctions[i] = function test() {
        //player 1 turn
        if (
          boardBox[i].innerText === '' &&
          player1.turn === true &&
          winner === null
        ) {
          whoseTurn.innerText = 'Player 2 (O), make your move';
          boardBox[i].innerText = player1.marker;
          board.push(player1.marker);
          player1.turn = false;
          player2.turn = true;

          if (board.length > 4) {
            isXwinner();
          }
          //just realized player 1 goes first and last, player 2 has it rough in tictactoe
          if (board.length == 9 && winner === null) {
            winner = 'draw';
            whoseTurn.innerText = "It's a DRAW!";
            whoseTurn.style.color = 'yellow';
            pvpButton.style.display = 'none';
            initialize();
          }
          //player 2 turn
        } else if (
          boardBox[i].innerText === '' &&
          player2.turn === true &&
          winner === null
        ) {
          whoseTurn.innerText = 'Player 1 (X), make your move';
          boardBox[i].innerText = player2.marker;
          board.push(player2.marker);
          boardBox[i].removeEventListener('click', test);
          player2.turn = false;
          player1.turn = true;
          if (board.length > 4) {
            isOwinner();
          }
        }
      };
    }
  }

  const playerMark = function () {
    for (let i = 0; i < boardBox.length; i++) {
      boardBox[i].addEventListener('click', boxFunctions[i]);
    }
  };

  const resetButton = document.querySelector('.reset');
  const pvpButton = document.querySelector('.pvp');
  const aiButton = document.querySelector('.ai');

  pvpButton.addEventListener('click', runPVP);
  aiButton.addEventListener('click', runAI);

  resetButton.disabled = true;

  // ----------------------------RUN PVP LOGIC--------------------------------------- //
  whoseTurn.innerText = 'Choose a mode';
  function runPVP() {
    PVPLogic();
    playerMark();
    boardContainer.classList.remove('deactivate');
    whoseTurn.innerText = 'Player 1 (X), make your move';
    hideButtons();
  }

  // ----------------------------RUN AI LOGIC--------------------------------------- //
  function runAI() {
    AILogic();
    AImode();
    boardContainer.classList.remove('deactivate');
    whoseTurn.innerText = '';
    hideButtons();
  }

  // ----------------------------HIDE BUTTONS LOGIC--------------------------------------- //
  function hideButtons() {
    pvpButton.disabled = true;
    aiButton.disabled = true;
    pvpButton.style.display = 'none';
    aiButton.style.display = 'none';
    resetButton.disabled = true;
  }

  //each possible winning combination
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

  // ----------------------------WINNER LOGIC--------------------------------------- //
  //could've use factory func here too
  function isX(item) {
    return item.innerText === 'X';
  }

  function isO(item) {
    return item.innerText === 'O';
  }

  //checks if any of the winning conditons have all Xs
  const isXwinner = function () {
    winningConditions.forEach((condition) => {
      if (condition.every(isX)) {
        condition.forEach((letter) => {
          letter.style.color = '#7fff00';
        });
        winner = true;
        gameOver = true;
        initialize();
        whoseTurn.innerText = 'Player 1 (X) has WON!';
        boardBox.forEach((box) => {
          if (box.innerText === 'O') box.style.color = 'red';
        });
      }
    });
    if (winner === true || board.length > 8) resetButton.disabled = false;
  };

  //checks if any of the winning conditons have all Os
  const isOwinner = function () {
    winningConditions.forEach((condition) => {
      if (condition.every(isO)) {
        winner = true;
        whoseTurn.innerText = 'Player 2 (O) has WON!';
        gameOver = true;
        initialize();
        condition.forEach((letter) => {
          letter.style.color = '#7fff00';
          boardBox.forEach((box) => {
            if (box.innerText === 'X') box.style.color = 'red';
          });
        });
      }
    });
    if (winner === true || board.length > 8) resetButton.disabled = false;
  };

  // ----------------------------RESET LOGIC--------------------------------------- //
  //resetting letter styling back to normal from green(win)/yellow(draw)
  function isResetting() {
    winningConditions.forEach((condition) => {
      condition.forEach((letter) => {
        letter.style.color = '#fff';
      });
    });
    whoseTurn.innerText = 'choose a mode';
    whoseTurn.style.color = '#b0c6dd';
    resetButton.innerText = 'RESET';
    boardContainer.classList.add('deactivate');
  }

  //clears board content and resets game logic
  function boardReset() {
    board.length = 0; //clear array
    boardBox.forEach((box) => {
      box.innerText = '';
    });

    player1.turn = true;
    player2.turn = false;
    AI.turn = false;
    winner = null;

    resetButton.disabled = true;
    pvpButton.disabled = false;
    aiButton.disabled = false;

    pvpButton.style.display = 'inline-block';
    aiButton.style.display = 'inline-block';

    isResetting();
  }

  //removes eventListeners from empty boxes when game is over
  function initialize() {
    for (let i = 0; i < boardBox.length; i++) {
      boardBox[i].removeEventListener('click', boxFunctions[i]);
    }
    boxFunctions.length = 0;
  }

  resetButton.addEventListener('click', boardReset);

  // ----------------------------AI LOGIC--------------------------------------- //

  function AILogic() {
    for (let i = 0; i < boardBox.length; i++) {
      boxFunctions[i] = function PlayerVsAI() {
        //player 1 turn
        if (
          boardBox[i].innerText === '' &&
          player1.turn === true &&
          winner === null
        ) {
          boardBox[i].innerText = player1.marker;
          board.push(player1.marker);
          player1.turn = false;
          AI.turn = true;

          isXwinner();
          delayMoves();
          isOwinner();

          board.push(AI.marker);
          AI.turn = false;
          if (board.length > 8 && winner === null) {
            whoseTurn.innerText = "It's a DRAW!";
            whoseTurn.style.color = 'yellow';
            pvpButton.style.display = 'none';
            initialize();
          }
        }
      };
    }
  }

  function AImode() {
    for (let i = 0; i < boardBox.length; i++) {
      boardBox[i].addEventListener('click', boxFunctions[i]);
    }
  }

  function delayMoves() {
    if (winner === null) {
      setTimeout(() => {
        aiFindBox();
      }, 400);
    }

    setTimeout(() => {
      isOwinner();
    }, 400);

    setTimeout(() => {
      player1.turn = true;
    }, 600);
  }

  //makes AI find random empty box and insert its marker
  function aiFindBox() {
    let random = Math.floor(Math.random() * 9);
    if (boardBox[random].innerText === '') {
      return (boardBox[random].innerText = AI.marker);
    } else {
      for (let i = 0; i < boardBox.length; i++) {
        if (boardBox[i].innerText === '') {
          if (board.length <= 8) {
            return (boardBox[i].innerText = AI.marker);
          }
        }
      }
    }
  }

  return { boxFunctions };
})();
