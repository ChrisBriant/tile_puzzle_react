import './App.css';
import { useState, useEffect } from 'react';
import ColorSequence from './components/ColorSequence';
import GridCanvas from './components/GridCanvas';
import { shuffleArray } from './helpers/helpers';
import MoveCounter from './components/MoveCounter';
import DialogMessage from './components/DialogMessage';

function App() {
  const availableColors = ["#20c91a","#c9c91a","#c9831a","#c9371a","#1a5dc9","#831ac9","#c91a9a"];
  const [randomisedColors,setRandomisedColors] = useState();
  //State variables
  const [moveCount,setMoveCount] = useState(0);
  const [grid,setGrid] = useState([]);
  const [loaded,setLoaded] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  
  useEffect(()=> {
    setRandomisedColors(shuffleArray(availableColors));
    setLoaded(true);
  },[]);

  //Reset the game after the game is over
  const resetGame = () => {
    console.log('Resetting game');
    setLoaded(false);
    setGameOver(false);
    setRandomisedColors(shuffleArray(availableColors));
    console.log(randomisedColors);
    setMoveCount(0);
    setGrid([]);
    setLoaded(true);
  }


  //Function to update the higher level variables - grid and movecount
  const updateGame = (grid) => {
    const newMoveCount = moveCount+1;
    setMoveCount(newMoveCount);
    setGrid(grid);
  }

  return (
    <div className="App">
      {/* <ColorSequence colors={availableColors} /> */}
      {
        gameOver
        ? <DialogMessage>
          <h1>Congratulations!</h1>
          <p>You have won with {moveCount} moves.</p>
          <button onClick={resetGame}>Start Over</button>
        </DialogMessage>
        : <></>
      }

      {
        loaded
        ? <>
          <ColorSequence colors={randomisedColors} />
          <MoveCounter moves={moveCount} />
          <GridCanvas colorSequence={randomisedColors} updateGame={updateGame} grid={grid} setGameOver={setGameOver}/>
        </>
        : <p>Loading...</p>
      }

    </div>
  );
}

export default App;
