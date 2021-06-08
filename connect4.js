/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

let WIDTH = 7;
let HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard () {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  //Setting 'board' to empty height x width creates a 2d array
  //that has a height of 6 rows by a width of 7 columns
  const board = [];
  for (let y = 0; y < HEIGHT; y++) {
    board[y] = [];
    for (let x = 0; x < WIDTH; x++) {
      //creates a new array?
      board[y][x] = null;
    }
  }
  console.log (board);
  //console.log (WIDTH, HEIGHT);
}

/*for(let i = 0; i < HEIGHT; i++) {
  //creates new array?
  board[i] = Array(WIDTH).fill(null);
}*/

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard () {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  //selects board
  const htmlBoard = document.querySelector ('#board');
  console.log (board);
  // TODO: add comment for this code
  //create table row (tr) element using document.createElement
  const top = document.createElement ('tr');
  //
  top.setAttribute ('id', 'column-top');
  // add eventListener that listens for handleClick
  top.addEventListener ('click', handleClick);

  for (let x = 0; x < WIDTH; x++) {
    //create a variable called headCell that references table data (td) element
    const headCell = document.createElement ('td');
    //if id exists, update it to x else create an id with the value x
    headCell.setAttribute ('id', x);
    //top -> tr & headCell -> td
    // add/nest table row (tr) inside of table data (td)
    top.append (headCell);
  }
  //
  htmlBoard.append (top);

  // TODO: add comment for this code
  //td = table data
  //tr = table row
  //set variable y to initialize  0; if y is less than height; keep iterating until false
  for (let y = 0; y < HEIGHT; y++) {
    //create table row (tr) element for HEIGHT?
    const row = document.createElement ('tr');
    for (let x = 0; x < WIDTH; x++) {
      //create table data for WIDTH?
      const cell = document.createElement ('td');
      //A little confused here. Are we setting height(y) and width(x) to id?
      cell.setAttribute ('id', `${y}-${x}`);
      row.append (cell);
    }
    htmlBoard.append (row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */
//x = WIDTH
function findSpotForCol (x) {
  // TODO: write the real version of this, rather than always returning 0
  for (let y = 0; y < HEIGHT; y++) {
    if (board[x] === null) return [y];
    //console.log (`this is x at column: ${y}`);
    //console.log ([x]);
    console.log (`this is a move at column: ${x}`);
  }
  return null;
  //return 0;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable (y, x) {
  // TODO: make a div and insert into correct table cell
  const div = document.createElement ('div');
  div.classList.add ('piece');
}

/** endGame: announce game end */

function endGame (msg) {
  // TODO: pop up alert message
  alert (msg);
  console.log ('game over');
}

/** handleClick: handle click of column top to play piece */

function handleClick (evt) {
  // get x from ID of clicked cell
  let x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol (x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board

  placeInTable (y, x);
  board[y][x] = currPlayer;

  // check for win
  if (checkForWin ()) {
    return endGame (`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  //using .every() and callback function to check all elements in an array (cells)
  //and returns a boolean value
  if (checkForWin.every (cells => cells.every (Boolean))) {
    console.log (`${cells}`);
    return endGame ('Tie game');
  }

  // switch players
  // TODO: switch currPlayer 1 <-> 2
  //instead of using an if statement, I'm using a ternary operator
  //to switch currPlayer; 1 -> 2 and vice versa
  //--logic-- currPlayer (condition) is strictly equal to player 1,
  //if currPlayer is 1, currPlayer = 2, else currPlayer = 1
  //let currPlayer = currPlayer === 1 ? 2 : 1;
  if (currPlayer === '1') {
    currPlayer = '2';
  } else {
    currPlayer = '1';
  }
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin () {
  function _win (cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every (
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win (horiz) || _win (vert) || _win (diagDR) || _win (diagDL)) {
        return true;
      }
    }
  }
}

makeBoard ();
makeHtmlBoard ();
