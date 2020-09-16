import React, {useContext} from 'react';
import './Messages.css'
import Context from '../context'

export default ({message}) => {
    const className = (message.sender === 'me' ? "message-right" : "message-left");
    const [ImageSrc, setImageSrc] = React.useState("#");

    const {setImageUrl} = useContext(Context); 

    const  reader = new FileReader();
      reader.onload = (e) => {
        setImageSrc(e.target.result);
      }
      var blob = new Blob([message.attachFile], {type: "image/jpg"});
      reader.readAsDataURL(blob);
    return (<div className={className}>
                <div className="message">
                    <div style={{display : 'block'}}>
                        <button className= "btn btn-default" 
                          onClick = {() => {setImageUrl(ImageSrc); }} 
                          style={{padding : 0, display : (ImageSrc === '#' || blob.size < 16 ? 'none' : 'flex')}} >
                          <img className="attachment" 
                            src={ImageSrc} 
                            />
                        </button>
                        <div className="message-text">
                            {message.message}
                        </div>
                        <div className="time">
                          {message.time}
                        </div>
                    </div>
                </div>
            </div>)
}