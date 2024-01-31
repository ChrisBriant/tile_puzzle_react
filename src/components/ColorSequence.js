import { useEffect, useRef } from "react";

const ColorSequence = (props) => {
  const canvasRef = useRef(null);
  console.log('props', props);

  useEffect(()=> {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    for(let i=0;i<props.colors.length;i++) {
      context.fillStyle = props.colors[i];
      context.fillRect(i*50, 0, 50, 50); 
    }
  },[]);

  return <canvas ref={canvasRef} width={props.colors.length * 50} height={50} />;
}

export default ColorSequence;