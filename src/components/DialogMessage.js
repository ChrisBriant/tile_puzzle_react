
const DialogMessage = ({ children }) => {
  return(
    <div className='overlay'>
      <div className='message-box'>
        { children }
      </div>
    </div>
  );
}

export default DialogMessage;