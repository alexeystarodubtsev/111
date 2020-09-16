import React, { useState } from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.css"
import Loader from './Loader'
import  { subscribe, SendMessage, closeConnection } from './api';
import Messages from './messages/Messages'
import Context from './context';
import Modal from './Modal/Modal';
import MIDISounds from 'midi-sounds-react';

function App() {


  const [listMessages, setlistMessages] = React.useState([]);
  const [message, setmessage] = React.useState("");
  const messageForm = document.getElementById("MessagesForm");
  
  
  const[ImageSrc, setImageSrc] = React.useState('#');

  const [attachment, setattachment] = React.useState({});

  React.useEffect(()=>{
    if (messageForm)
    {   messageForm.scrollTop = messageForm.scrollHeight - messageForm.clientHeight;
    }
  },[listMessages])

  const [midiSounds, setmidiSounds] = React.useState(null);

  function playsound () {
    console.log("plass");
    if (midiSounds)
    {
      midiSounds.playChordNow(10, [90], 0.1);
      setTimeout(() => {
        midiSounds.playChordNow(10, [70], 0.1);
    }, 130)
  }
}
  // React.useEffect(()=>{
  //   const input = document.getElementById("InputMess");
  //   input.addEventListener("keyup", function(event) {
  //     // Number 13 is the "Enter" key on the keyboard
  //     if (event.keyCode === 13) {
  //       // Cancel the default action, if needed
  //       event.preventDefault();
  //       // Trigger the button element with a click
  //       document.getElementById("BtnSend").click();
  //     }
  //   });

  // },[])
  
  function AddMessage(m)
  {
      const time = new Date();
      m = {...m, time : `${time.getHours()}:${time.getMinutes()}`};
      setlistMessages((lm) => [...lm,m]); 
  }

  React.useEffect(() => {
    
    subscribe("Maxim", (m)=> {
      AddMessage(m);
      const playSound = document.getElementById("btnplay");
      console.log(playSound);
      if (playSound)
        playSound.click();
    });

    const input = document.getElementById("InputMess");
    input.addEventListener("keyup", function(event) {
      // Number 13 is the "Enter" key on the keyboard
      if (event.keyCode === 13) {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        document.getElementById("BtnSend").click();
      }
    });

    return () => closeConnection;
  }, []);


  const [loading, setloading] = React.useState(false);

  function attachFile(event) {
    if (event.target.files.length)
    {   
      setattachment(event.target.files[0]);
      const  reader = new FileReader();
      setloading(true);
      reader.onload = (e) => {
        setImageSrc(e.target.result);
        setloading(false);
      }
      reader.readAsDataURL(event.target.files[0]);
      
    }
    else
    {
      setImageSrc('#');
      setattachment({});
    }
  }
  const [ImageUrl, setImageUrl] = React.useState('#');
  return (
    <Context.Provider value={{setImageUrl}}>
      <div style={{marginLeft: '1rem'}}>
        {/*loading && <Loader/>*/}
        <Modal ImageUrl={ImageUrl}  />
        <Messages messages = {listMessages}/>
        {loading && <Loader/>}
        <div style={{display : (ImageSrc === '#' ? 'none' : 'flex')}}>
          
          <img id="attachImg" src={ImageSrc} />
          <button className = "closeAttach" onClick = {() => {setImageSrc('#'); setattachment({})}} >
            &times;
          </button>
        </div>
        <div className = "newMessage">
        <input className="form-control" id = "InputMess" value = {message} 
          onChange={(event) => {
            setmessage(event.target.value);
          }} 
          placeholder="Введите сообщение"  />

        <label className="btn btn-default btn-file" >
        <span className="attach"></span>
          <input type="file"  style={{display:'none'}} onChange = {(event)=>attachFile(event)} accept="image/gif, image/jpg, image/jpeg, image/png"  />
        </label>  
        <button id = "BtnSend" className="btn btn-success" style = {{ marginLeft : '.5rem', height: '40px'}} disabled={!message.trim().length && ImageSrc === '#'} onClick={()=> {
          SendMessage({message, sender : 'other', attachFile : attachment});
          AddMessage({message, sender : 'me', attachFile : attachment});
          setmessage("");
          setImageSrc('#'); 
          setattachment({});
        }}>
          Отправить
        </button>
        </div>
      </div>
      <div style = {{display : 'none'}}>
      <p><button id="btnplay" onClick={(e) => playsound(e)}>Play</button></p>
      <MIDISounds ref={(ref) => setmidiSounds(ref)} appElementName="root" instruments={[1]}  />
      </div>
    </Context.Provider>
  );
}

export default App;
