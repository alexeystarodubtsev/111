import React, {useContext} from 'react';
import './Modal.css';
import Context from '../context'

export default ({ImageUrl}) => {
    
    const {setImageUrl} = useContext(Context); 
        return (
            
                <div className="modal" style={{display : (ImageUrl === '#' ? 'none' : 'flex')}}>
                    <img className="Img" src={ImageUrl} />
                    <button className = "closeImg" onClick = {() => {setImageUrl('#')}} >
                    &times;
                    </button>
                </div>
        )
    
}