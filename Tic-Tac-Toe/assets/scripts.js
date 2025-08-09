// Game Board Module
const GameBoard = (() => {
  const board = Array(9).fill(null);

  const getBoard = () => board;

  /**
   * Places a mark on the game board at the specified index if the spot is empty.
   * @param {number} index - The position on the board (0-8) to place the mark.
   * @param {string} mark - The player's mark (e.g., 'X' or 'O') to place on the board.
   */
  const setMark = (index, mark) => {
    if (board[index] === null) board[index] = mark;
  };

  const resetBoard = () => {
    for (let i = 0; i < board.length; i++) {
      board[i] = null;
    }
  };

  return { getBoard, setMark, resetBoard };
})();

// Player Factory
const Player = (name, mark) => {
  return { name, mark };
};

// Game Controller Module (IIFE)
const GameController = (() => {
  let player1, player2, currentPlayer;
  let gameOver = false;

  /**
   * Starts a new game of Tic Tac Toe.
   * @param {string} name1 - The name of the first player.
   * @param {string} name2 - The name of the second player.
   */
  const startGame = (name1, name2) => {
    player1 = Player(name1, "X");
    player2 = Player(name2, "O");
    currentPlayer = player1;
    gameOver = false;
    GameBoard.resetBoard();
  };

  /**
   * Plays a turn at the specified index if the game is not over and the position is empty.
   * If a player has won or the game is a tie, sets gameOver flag and returns a message.
   * Otherwise, switches to the other player.
   * @param {number} index - The position on the board (0-8) to play the turn.
   * @returns {string} - The message for the user if the game is over.
   */
  const playTurn = (index) => {
    if (gameOver || GameBoard.getBoard()[index] !== null) return;
    GameBoard.setMark(index, currentPlayer.mark);

    if (checkWin()) {
      gameOver = true;
      DisplayController.resultDisplay.textContent = `${currentPlayer.name} wins!`;
      // Disable the board to prevent further moves
      DisplayController.boardContainer.style.pointerEvents = "none";
      return;
    } else if (checkTie()) {
      gameOver = true;
      DisplayController.resultDisplay.textContent = "It's a tie!";
      // Disable the board to prevent further moves
      DisplayController.boardContainer.style.pointerEvents = "none";
      return;
    }
    switchPlayer();
  };

  /**
   * Switches the current player to the other player.
   */
  const switchPlayer = () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  };

  /**
   * Checks if the current player has won the game by matching any of the winning patterns.
   * @returns {boolean} - Returns true if the current player has a winning combination, otherwise false.
   */
  const checkWin = () => {
    const board = GameBoard.getBoard();
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // Rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // Columns
      [0, 4, 8],
      [2, 4, 6], // Diagonals
    ];
    return winPatterns.some((pattern) =>
      pattern.every((i) => board[i] === currentPlayer.mark)
    );
  };

  const checkTie = () => {
    return GameBoard.getBoard().every((cell) => cell !== null);
  };

  return { startGame, playTurn };
})();

// UI Module DOM Manipulation
const DisplayController = (() => {
  const boardContainer = document.querySelector(".board");
  const resultDisplay = document.querySelector(".result");

  /**
   * Renders the game board on the page by creating a cell for each cell in the GameBoard.
   * Also adds an event listener to each cell to call the GameController.playTurn method
   * when the cell is clicked.
   */
  const renderBoard = () => {
    boardContainer.innerHTML = "";
    GameBoard.getBoard().forEach((mark, index) => {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.textContent = mark;
      cell.addEventListener("click", () => {
        const result = GameController.playTurn(index);
        renderBoard();
        if (result) resultDisplay.textContent = result;
      });
      boardContainer.appendChild(cell);
    });
  };

  return { renderBoard, boardContainer, resultDisplay };
})();

// Get the start button element
const startButton = document.getElementById("startBtn");

// Add an event listener to the start button
startButton.addEventListener("click", () => {
  // Get the player names from the input fields
  const player1Name = document.getElementById("player1").value;
  const player2Name = document.getElementById("player2").value;

  // Call the startGame function with the player names
  GameController.startGame(player1Name, player2Name);

  // Render the game board
  DisplayController.renderBoard();
});


// Get the restart button element
const restartButton = document.getElementById("restartBtn");
restartButton.addEventListener("click", () => {
  GameBoard.resetBoard();
  DisplayController.renderBoard();
  DisplayController.resultDisplay.textContent = "";
  DisplayController.boardContainer.style.pointerEvents = "auto";
});

