const gameBoard = (() => {
  'use strict';
  const _privateVar = 'test';
  const board = [];

  const checkWinner = () => {};

  return { board };
})();

const playerFactory = (marker) => {
  const boardSquare = document.querySelectorAll('.box');
  console.log(boardSquare);

  //function that allows player to click square with and fill with their marker
  const placeMark = () => {
    for (let i = 0; i < boardSquare.length; i++) {
      if (boardSquare[i].innerText === '') {
        boardSquare[i].addEventListener('click', () => {
          boardSquare[i].innerText = marker;
          gameBoard.board.push(marker);
        });
      }
    }
  };
  return { placeMark };
};

playerFactory('x').placeMark();

const computerPlayer = (marker) => {
  const { placeMark } = playerFactory(marker);
};

const displayBoard = document.querySelector('.game-container');
