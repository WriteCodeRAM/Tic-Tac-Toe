const gameBoard = (() => {
  'use strict';
  const boardBox = document.querySelectorAll('.box');
  let board = ['', '', '', '', '', '', '', '', ''];
  console.log(boardBox);

  //factory function for players
  function playerFactory(marker, turn) {
    return {
      marker,
      turn,
    };
  }

  const player1 = playerFactory('X', true);
  const player2 = playerFactory('O', false);

  const playerMark = (function () {
    boardBox.forEach((box) => {
      box.addEventListener('click', () => {
        //player 1 logic
        if (box.innerText === '' && player1.turn === true) {
          box.innerText = player1.marker;
          board.push(player1.marker);
          player1.turn = false;
          player2.turn = true;
        } else if (box.innerText === '' && player2.turn === true) {
          box.innerText = player2.marker;
          board.push(player2.marker);
          player2.turn = false;
          player1.turn = true;
        }
      });
    });
  })();

  const getBoardLength = function () {
    return board.length;
  };

  let i = 0;
  boardBox.forEach((box) => {
    box.innerText = board[i];
    i++;
  });
  return { boardBox, getBoardLength };
})();

//allow user to face human or AI
const chooseMode = (function () {
  const pvpButton = document.querySelector('.pvp');
  const aiButton = document.querySelector('.ai');
  const buttons = document.querySelectorAll('button');

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      pvpButton.disabled = true;
      aiButton.disabled = true;
    });
  });

  // pvpButton.addEventListener('click', Player);
})();
