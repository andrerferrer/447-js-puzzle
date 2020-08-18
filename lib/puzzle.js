// //////////////
// THE WARM UP //
// //////////////

// 1. select the element
const button = document.getElementById('show-hint');
// 2. add an event listener
// element.addEventListener('event', () => {})
button.addEventListener('click', (event) => {
  // Testing the code
  // console.log('Sebastian is not laying yet');
  // console.log(event);
  // console.log(event.currentTarget);

  // 3. implement the callback - 
  // toggle the class active on the element with .hint
  // 3.1 select the element
  const hint = document.querySelector('.hint');
  // 3.2 toggle the class active
  hint.classList.toggle('active');
});

// ////////////////////////////////////////
// ////////////// THE GAME ////////////////
// ////////////////////////////////////////

// /////////////////
// THE FUNCTIONS //
// ///////////////

const canMove = (tile) => {
  // find the row of the tile
  const tileRow = tile.parentElement.rowIndex;
  // find the column of the tile
  const tileCol = tile.cellIndex;

  // find THE empty tile
  const emptyTile = document.querySelector('td.empty');

  // find the row of the empty tile
  const emptyTileRow = emptyTile.parentElement.rowIndex;
  // find the column of the empty tile
  const emptyTileCol = emptyTile.cellIndex;

  // console.log(`tileCol = ${tileCol}`);
  // console.log(`tileRow = ${tileRow}`);
  // console.log(`emptyTileCol = ${emptyTileCol}`);
  // console.log(`emptyTileRow = ${emptyTileRow}`);

  let rowDiff = tileRow - emptyTileRow;
  rowDiff = Math.abs(rowDiff);

  let colDiff = tileCol - emptyTileCol;
  colDiff = Math.abs(colDiff);

  // if they are adjancent, return true

  // we need to check IF
  // the row is the same AND the col diff is 1

  // this is the long way
  // if (rowDiff === 0 && colDiff === 1) {
  //   return true;
  //   // the col is the same AND t he row diff is 1
  // } else if (rowDiff === 1 && colDiff === 0) {
  //   return true;
  // } else {
  //   return false;
  // }

  // this the short way
  return (rowDiff === 0 && colDiff === 1) || (rowDiff === 1 && colDiff === 0)
};

const move = (tile) => {
  // find the empty
  const emptyTile = document.querySelector('td.empty');

  // remove the empty class from the empty tile
  emptyTile.classList.remove('empty');
  // take what's inside (innerText) of the tile and put it inside the empty tile (which is no longer empty btw)
  emptyTile.innerText = tile.innerText;

  // remove the inner text from the tile
  tile.innerText = '';
  // add the empty class to the tile
  tile.classList.add('empty');
};

const checkIfGameIsOver = () => {
  let currentSequence = '';
  const tiles = document.querySelectorAll('td');
  tiles.forEach( (td) => { 
    currentSequence += td.innerText + ','
  });
  const winningSequence = '1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,,';

  if (currentSequence === winningSequence) {
    alert('Game is OVER! Congrats!');
    document.location.reload();
  }
};

// /////////////////////////////////////////////
// SELECT ELEMENTS AND ADD EVENT LISTENERS   //
// ///////////////////////////////////////////

// 1. select all the tiles
const tiles = document.querySelectorAll('#board td');
// 2. for each tile
// plural.forEach( (singular) => {} );
tiles.forEach((tile) => {
  // when a click happens
  tile.addEventListener('click', (event) => {
    // check if the tile can move
    if (canMove(tile)) {
      // if yes, move it
      move(tile);
      // check if the game is over and end the game
      checkIfGameIsOver();
    };
  })
});










































// The code below shuffles the game.

// ///////////////////
// FORBIDDEN FOREST //
// ///////////////////

// It's not safe to go outside! Take this sword:
//               O
//               {____________________________________
// @XXXXXXXXXXXXXX___________________________________.>
//               {
//               O

// Ok. now you're ready to check the functions below:

const shuffleArray = (array) => {
  const resultArray = [...array];
  for (let i = resultArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [resultArray[i], resultArray[j]] = [resultArray[j], resultArray[i]];
  }
  return resultArray;
}

const shuffleGame = (tiles) => {
  document.querySelector('td.empty').classList.remove('empty');
  const numbersArray = [...tiles].map(tile => tile.innerText);
  const shuffledNumbers = shuffleArray(numbersArray);
  tiles.forEach((tile, index) => {
    tile.innerText = shuffledNumbers[index];
    if (!tile.innerText) tile.classList.add('empty');
  });
}

shuffleGame(tiles);