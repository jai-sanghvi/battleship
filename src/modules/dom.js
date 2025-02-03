export const DOM = {
  renderFirstBoard(player, boardElement) {
    renderBoard(player, boardElement, 'private');
  },

  renderSecondBoard(player, boardElement) {
    renderBoard(player, boardElement, 'public');
  }
}

function renderBoard(player, boardElement, type) {
  const cells = [];

  for (let i = 0; i < player.gameboard.size; i++) {
    for (let j = 0; j < player.gameboard.size; j++) {
      const cell = player.gameboard.board[i][j];
      const cellElement = document.createElement('div');

      if (cell && cell === 'miss') {
        cellElement.textContent = "M";
      } else if (cell && cell === 'hit') {
        cellElement.textContent = "H";
        cellElement.style.backgoundColor = 'yellow';
      }

      if (type === 'private' && (cell && typeof cell.hit === 'function')) {
        cellElement.textContent = "S";
      }
      
      cellElement.classList.add('cell');
      cellElement.dataset.x = i;
      cellElement.dataset.y = j;
      cells.push(cellElement);
      boardElement.style.gridTemplate = `repeat(${player.gameboard.size}, 1fr) / repeat(${player.gameboard.size}, 1fr)`;
    }
  }
  
  boardElement.replaceChildren(...cells);
}