import React, { useRef, useEffect, useState } from 'react';
import {getNextInSequence, getSurroundingIndices} from '../helpers/helpers';
import { createRenderer } from 'react-dom/test-utils';

const GridCanvas = (props) => {
  const canvasRef = useRef(null);
  //const availableColors = ["#20c91a","#c9c91a","#c9831a","#c9371a","#1a5dc9","#831ac9","#c91a9a"];
  const gridSize = 6;
  const gridSquareSize = 30;
  const gridOffsetX = 50;
  const gridOffsetY = 50;
  const grid = [];
  const goalGrid = [];

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
    drawGrid(gridOffsetX,gridOffsetY,grid,gridSize,gridSquareSize,context);
    createGoalGrid(startColor,context);
  }, []);

  const createGoalGrid = (startColor,context) => {
    for(let i=0;i < gridSize*gridSize; i++) {
      goalGrid[i] = startColor;
    }
    //Get random tile and change the color sequence
    // Get a random index
    const randomIndex = Math.floor(Math.random() * goalGrid.length);
    // Get the random item
    const nextColor = getNextColor(goalGrid[randomIndex]);
    console.log('NEXT COLOR', nextColor);
    //Set the grid
    goalGrid[randomIndex] = nextColor;
    const surroundingIndicies = getSurroundingIndices(gridSize,randomIndex);
    console.log('Surrounding', surroundingIndicies, goalGrid);
    surroundingIndicies.forEach(idx => {
      const nextColor = getNextColor(goalGrid[idx],2);
      goalGrid[idx] = nextColor;
    });
    drawGrid(gridOffsetX + 200, gridOffsetY,goalGrid,gridSize,gridSquareSize,context);
  }

  const getGridItem = (x,y, width,grid) => {
    const idx = y * width + x;
    return grid[idx];
  }
  
  //jumpValue is the number of steps to jump in the cycle
  const getNextColor = (clickedColor,jumpValue=1) => {
    const currentColorIndex = props.colorSequence.indexOf(clickedColor);
    //console.log('Current Color', currentColorIndex, props.colorSequence, clickedColor, grid);
    const nextColorIndex = getNextInSequence(props.colorSequence, currentColorIndex, jumpValue);
    return props.colorSequence[nextColorIndex];
  }

  const getClickedGridIndex = (clickX,clickY,gridSize,offset,squareSize) => {
    // Detect if out of bounds of the grid
    const maxXY = (gridOffsetX + gridSize * squareSize);
    if((clickX < gridOffsetX || clickX > maxXY) || (clickY < gridOffsetY || clickY > maxXY)) {
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

  const drawGrid = (offsetX,offsetY,grid,gridSize,squareSize,context) => {
    for(let x=0;x<gridSize;x++) {
      for(let y=0;y<gridSize; y++) {
        context.fillStyle = getGridItem(x,y,gridSize,grid);
        //console.log('Grid item', getGridItem(x,y,gridSize,grid));
        context.fillRect((x*squareSize) + 1 + offsetX,(y*squareSize) + 1 + offsetY, squareSize -1,squareSize-1);
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
    const gridIdx = getClickedGridIndex(mouseX,mouseY,gridSize,gridOffsetX,gridSquareSize);
    console.log('Clicked index', gridIdx);
    if(gridIdx === -1) {
      return;
    }
    const nextColor = getNextColor(grid[gridIdx]);
    //console.log('NEXT COLOR', nextColor);
    //Set the grid
    grid[gridIdx] = nextColor;
    const surroundingIndicies = getSurroundingIndices(gridSize,gridIdx);
    console.log('Surrounding', surroundingIndicies);
    surroundingIndicies.forEach(idx => {
      const nextColor = getNextColor(grid[idx],2);
      grid[idx] = nextColor;
    });
    drawGrid(gridOffsetX,gridOffsetY,grid,gridSize,gridSquareSize,context);
    
    // const gridSize = 4; // Adjust this based on your gridSize
    // const squareSize = 20; // Adjust this based on your squareSize
    // const offsetX = 100; // Adjust this based on your offset


  }

  return <canvas ref={canvasRef} onMouseDown={handleMouseDown} width={600} height={600} />;
};

export default GridCanvas;
