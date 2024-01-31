import React, { useRef, useEffect, useState } from 'react';
import {getNextInSequence, getSurroundingIndices} from '../helpers/helpers';

const GridCanvas = (props) => {
  const canvasRef = useRef(null);
  //const availableColors = ["#20c91a","#c9c91a","#c9831a","#c9371a","#1a5dc9","#831ac9","#c91a9a"];
  const gridSize = 6;
  const gridSquareSize = 30;
  const gridOffset = 50;
  const grid = [];

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Set the fill color and draw a solid block
    //context.fillStyle = 'blue'; // Change the color as needed
    context.fillStyle = props.colorSequence[Math.floor(Math.random() * props.colorSequence.length)];
    const startColor = props.colorSequence[Math.floor(Math.random() * props.colorSequence.length)];
    //let grid = [];
    for(let i=0;i < gridSize*gridSize; i++) {
      grid[i] = startColor;
    }
    //console.log('Here is the grid', grid);
    context.fillRect(0, 0, 600, 600); // Adjust the coordinates and dimensions as needed
    drawGrid(gridOffset,grid,gridSize,gridSquareSize,context);
  }, []);

  const getGridItem = (x,y, width,grid) => {
    const idx = y * width + x;
    return grid[idx];
  }
  
  const getNextColor = (clickedColor) => {
    const currentColorIndex = props.colorSequence.indexOf(clickedColor);
    //console.log('Current Color', currentColorIndex, props.colorSequence, clickedColor, grid);
    const nextColorIndex = getNextInSequence(props.colorSequence, currentColorIndex, 2);
    return props.colorSequence[nextColorIndex];
  }

  const getClickedGridIndex = (clickX,clickY,gridSize,offset,squareSize) => {
    // Detect if out of bounds of the grid
    const maxXY = (offset + gridSize * squareSize);
    if((clickX < offset || clickX > maxXY) || (clickY < offset || clickY > maxXY)) {
      return -1;
    }
    // Calculate the grid cell coordinates
    const gridX = Math.floor((clickX - offset) / squareSize);
    const gridY = Math.floor((clickY - offset) / squareSize);
    //Calculate and return grid index
    //console.log('GRID X AND Y', clickX - offset, clickY - offset);
    const clickedIdx = gridY * gridSize + gridX;
    // if(clickedIdx > -1 && clickedIdx < gridSize * gridSize) {
    //   return clickedIdx
    // }
    return clickedIdx;
  }

  const drawGrid = (offest,grid,gridSize,squareSize,context) => {
    for(let x=0;x<gridSize;x++) {
      for(let y=0;y<gridSize; y++) {
        context.fillStyle = getGridItem(x,y,gridSize,grid);
        //console.log('Grid item', getGridItem(x,y,gridSize,grid));
        context.fillRect((x*squareSize) + 1 + offest,(y*squareSize) + 1 + offest, squareSize -1,squareSize-1);
      }
    }
  }

  const handleMouseDown = (e) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    //console.log('clicked', mouseX,mouseY);
    const gridIdx = getClickedGridIndex(mouseX,mouseY,gridSize,gridOffset,gridSquareSize);
    console.log('Clicked index', gridIdx);
    const nextColor = getNextColor(grid[gridIdx]);
    //console.log('NEXT COLOR', nextColor);
    //Set the grid
    grid[gridIdx] = nextColor;
    const surroundingIndicies = getSurroundingIndices(gridSize,gridIdx);
    console.log('Surrounding', surroundingIndicies);
    drawGrid(gridOffset,grid,gridSize,gridSquareSize,context);
    
    // const gridSize = 4; // Adjust this based on your gridSize
    // const squareSize = 20; // Adjust this based on your squareSize
    // const offsetX = 100; // Adjust this based on your offset


  }

  return <canvas ref={canvasRef} onMouseDown={handleMouseDown} width={600} height={600} />;
};

export default GridCanvas;