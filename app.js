const gameBoard = (() => {
  'use strict';

  const buttonX = document.getElementById('x');
  const buttonO = document.getElementById('o');
  const buttons = document.querySelectorAll('button');
  const controllerP = document.querySelector('.controller');
  const boardSquare = document.querySelectorAll('.box');
  let playerOneMarker;
  let playerTwoMarker;

  const chooseMarker = document.createElement('p');
  chooseMarker.innerText = 'Player 1, would you like to be X or O?';
  controllerP.appendChild(chooseMarker);

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      playerOneMarker = button.innerText;
      playerOneMarker === 'X'
        ? (playerTwoMarker = 'O')
        : (playerTwoMarker = 'X');

      console.log(playerOneMarker);
      //   playerTwo.placeMarker(playerTwoMarker);

      playerOne(playerOneMarker);
      playerTwo(playerTwoMarker);

      buttonO.disabled = true;
      buttonX.disabled = true;
      chooseMarker.innerText = '';
    });
  });

  let board = [];

  //render contents of gameboard array to game-board
  let j = 0;
  const displayBoard = function () {
    for (let i = 0; i < board.length; i++) {
      console.log(j);
      boardSquare[j].innerText = board[i];
      j++;
    }
  };

  displayBoard();
  return { boardSquare, board, playerOneMarker, playerTwoMarker };
})();
//end IIFE

//Factory Function
function playerOne(marker) {
  const placeMarker = () => {
    gameBoard.boardSquare.forEach((square) => {
      square.addEventListener('click', () => {
        console.log(gameBoard.playerTwoMarker);
        if (gameBoard.board.length === 0 || gameBoard.board.length % 2 === 0) {
          if (square.innerText === '') {
            square.innerText = marker;
            if (marker !== '') {
              gameBoard.board.push(marker);
            }
          }
        }
      });
    });
  };
  placeMarker();
  return { placeMarker };
}

function playerTwo(marker) {
  const placeMarker = () => {
    gameBoard.boardSquare.forEach((square) => {
      square.addEventListener('click', () => {
        console.log(gameBoard.playerTwoMarker);
        if (gameBoard.board.length === 0 || gameBoard.board.length % 2 !== 0) {
          if (square.innerText === '') {
            square.innerText = marker;
            if (marker !== '') {
              gameBoard.board.push(marker);
            }
          }
        }
      });
    });
  };
  placeMarker();
}

//kept getting undefined when using the factor function so I just created another playerObj
// Player 2 Logic (inheritance fact func route)
// const playerTwo = playerOne('');
// console.log(playerTwo);
// playerTwo.placeMarker = (marker) => { };
