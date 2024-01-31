function shuffleArray(array) {
  let suffled = [...array];
  for (let i = suffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [suffled[i], suffled[j]] = [suffled[j], suffled[i]];
  }
  return suffled;
}

function getNextInSequence(array, idx, offset=1) {
  if(idx + offset > array.length -1 ) {
    console.log('Out of bounds', idx+offset - array.length);
    //return 0 + (offset - 1);
    return idx+offset - array.length;
  }
  return idx + offset;
}


// function getSurroundingIndices(gridSize, currentIndex) {
//   const row = Math.floor(currentIndex / gridSize);
//   const col = currentIndex % gridSize;

//   const surroundingIndices = [];

//   // Left
//   if (col > 0) {
//     surroundingIndices.push(currentIndex - 1);
//   }

//   // Right
//   if (col < gridSize - 1) {
//     surroundingIndices.push(currentIndex + 1);
//   }

//   // Up
//   if (row > 0) {
//     surroundingIndices.push(currentIndex - gridSize);
//   }

//   // Down
//   if (row < gridSize - 1) {
//     surroundingIndices.push(currentIndex + gridSize);
//   }

//   return surroundingIndices;
// }

function getSurroundingIndices(gridSize, currentIndex) {
  const row = Math.floor(currentIndex / gridSize);
  const col = currentIndex % gridSize;

  const surroundingIndices = [];

  // Left
  if (col > 0) {
    surroundingIndices.push(currentIndex - 1);
  }

  // Right
  if (col < gridSize - 1) {
    surroundingIndices.push(currentIndex + 1);
  }

  // Up
  if (row > 0) {
    surroundingIndices.push(currentIndex - gridSize);
  }

  // Down
  if (row < gridSize - 1) {
    surroundingIndices.push(currentIndex + gridSize);
  }

  // Diagonals
  if (col > 0 && row > 0) {
    surroundingIndices.push(currentIndex - gridSize - 1);
  }

  if (col < gridSize - 1 && row > 0) {
    surroundingIndices.push(currentIndex - gridSize + 1);
  }

  if (col > 0 && row < gridSize - 1) {
    surroundingIndices.push(currentIndex + gridSize - 1);
  }

  if (col < gridSize - 1 && row < gridSize - 1) {
    surroundingIndices.push(currentIndex + gridSize + 1);
  }

  return surroundingIndices;
}

export {shuffleArray, getNextInSequence, getSurroundingIndices};