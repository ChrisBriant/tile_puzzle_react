

const MoveCounter = (props) => {
  return(
    <div className="move-counter">
      <p>Move Count: </p><p>{props.moves}</p> 
    </div>
  );
}

export default MoveCounter;