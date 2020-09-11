import React from 'react';
import './Messages.css'
export default ({message}) => {
    const className = (message.sender === 'me' ? "message-right" : "message-left");
    const [ImageSrc, setImageSrc] = React.useState("#");
    const  reader = new FileReader();
      reader.onload = (e) => {
        setImageSrc(e.target.result);
      }
      var blob = new Blob([message.attachFile], {type: "image/jpg"});
      reader.readAsDataURL(blob);
      
    return (<div className={className}>
                <div className="message">
                    <div style={{display : 'block'}}>
                        <img className="attachment" src={ImageSrc} style={{display : (ImageSrc === '#' || blob.size < 16 ? 'none' : 'flex')}}/>
                        <div className="message-text">
                            {message.message}
                        </div>
                    </div>
                </div>
            </div>)
}