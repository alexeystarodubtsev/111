import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.css"
import Loader from './Loader'
import  { subscribe, SendMessage } from './api';




function App() {

  const [listMessages, setlistMessages] = React.useState(["init"]);
  //let listMessages = "init";

  React.useEffect(() => {
    
    subscribe("Maxim", (m)=> {
      console.log(m);
      //listMessages = m;
      setlistMessages([...listMessages, m]);

      setTimeout(()=> {console.log(listMessages)}, 2000);
      
    })
    
  }, []);

  const [loading, setloading] = React.useState(false);

  const [message, setmessage] = React.useState("");

  return (
    <div style={{marginLeft: '1rem'}}>
      {loading && <Loader/>}
      <div>
      <input className="form-control" value = {message} 
        onChange={(event) => {
          setmessage(event.target.value);
        }} 
        placeholder="Введите сообщение" style={{width : '300px', marginTop : '50px'}} />
      <button className="btn btn-success" style = {{marginTop :'1.5rem'}} onClick={()=> {
        SendMessage(message);
        
        setmessage("");
      }}>
        Отправить
      </button>
      </div>
      <ul>
        {listMessages.map((m,index) => {
          return <li key={index}>{m}</li>
        })}
      </ul>
    </div>
  );
}

export default App;
