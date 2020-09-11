import React from 'react';
import './Messages.css'
import Message from './Message'
export default ({messages}) => {



    return (
        
        <div className="messages" id="MessagesForm">
         {  messages.map ((m,index) => {
                 return <Message message = {m} key={index}/>

         })
           
        }
        </div>
    );
    
}
