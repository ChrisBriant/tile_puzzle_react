import './App.css';
import { useEffect } from 'react';
import ColorSequence from './components/ColorSequence';
import GridCanvas from './components/GridCanvas';
import { shuffleArray } from './helpers/helpers';

function App() {
  const availableColors = ["#20c91a","#c9c91a","#c9831a","#c9371a","#1a5dc9","#831ac9","#c91a9a"];
  const randomisedColors = shuffleArray(availableColors);
  console.log('random colors', randomisedColors);

  // useEffect(()=> {
    
    
  // },[]);


  return (
    <div className="App">
      <ColorSequence colors={availableColors} />
      <ColorSequence colors={randomisedColors} />
      <GridCanvas colorSequence={randomisedColors} />
    </div>
  );
}

export default App;
