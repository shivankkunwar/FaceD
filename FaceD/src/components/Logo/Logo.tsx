import React from 'react';
import Tilt from 'react-parallax-tilt';
import brain from './brain.png'
import './Logo.css';
const Logo=()=>{
    return (
        <Tilt className="Tilt br2 shadow-2 ml3" style={{ height: 150, width: 150 }} >
        <div className="Tilt-inner"> <img style={{'height':'120px','width':'120','paddingTop':'10px'}}alt='logo' src={brain}/> </div>
        </Tilt>
    );
}
export default Logo;