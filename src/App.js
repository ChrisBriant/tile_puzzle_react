import './App.css';
import { useState, useEffect } from 'react';
import ColorSequence from './components/ColorSequence';
import GridCanvas from './components/GridCanvas';
import { shuffleArray } from './helpers/helpers';
import MoveCounter from './components/MoveCounter';

function App() {
  const availableColors = ["#20c91a","#c9c91a","#c9831a","#c9371a","#1a5dc9","#831ac9","#c91a9a"];
  const [randomisedColors,setRandomisedColors] = useState();
  //State variables
  const [moveCount,setMoveCount] = useState(0);
  const [grid,setGrid] = useState([]);
  const [loaded,setLoaded] = useState(false);
  
  useEffect(()=> {
    setRandomisedColors(shuffleArray(availableColors));
    setLoaded(true);
  },[]);


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
        loaded
        ? <>
          <ColorSequence colors={randomisedColors} />
          <MoveCounter moves={moveCount} />
          <GridCanvas colorSequence={randomisedColors} updateGame={updateGame} grid={grid}/>
        </>
        : <p>Loading...</p>
      }

    </div>
  );
}

export default App;
