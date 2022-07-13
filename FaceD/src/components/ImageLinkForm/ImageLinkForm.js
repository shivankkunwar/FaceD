import React from 'react';
import "./ImageLinkForm.css"
const ImageLinkForm=({ onInputChange,onButtonSubmit })=>{
    return (
      <div >
        <p className='f3'>{'This will Detect Faces in  your photos (enter .jpg url)'}</p>
        <div className='center'>
            <div className=' form centers pa4 br3 shadow-5'>
                <input className='f4 pa2 w-70 center' type='text' onChange={onInputChange}/>
                <button className='w-30 grow f4  link ph3 pv2 dib white bg-light-purple' onClick={onButtonSubmit}>DETECT</button>
            </div> 
                
        </div>
        </div>
    );
}
export default ImageLinkForm;