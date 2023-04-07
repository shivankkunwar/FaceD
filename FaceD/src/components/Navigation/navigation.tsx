import React from 'react';
import "./navigation.css"
type navType={
    onRouteChange:any,
    isSignedIn:boolean
}
const navigation=({onRouteChange, isSignedIn }:navType)=>{
    if(isSignedIn){
        return (
            <nav style={{'display':'flex','justifyContent':'space-between'}}>
            <h1 style={{'color':'#FEFFFF','marginLeft':'3rem'}}>FACE DETECTION</h1>    
            <div style={{'display':'flex','justifyContent':'flex-end','marginRight':'3rem'}}>
           
            <p onClick={()=>onRouteChange('signOut')} className='f3 link grow pointer b--black-10  pointer mw6   br-pill   but'>Sign Out</p>
            </div> 
            </nav>
        );
    }else{
        return (
            <nav style={{'display':'flex','justifyContent':'space-between'}}>
            <h1 style={{'color':'#FEFFFF','marginLeft':'3rem'}}>FACE DETECTION</h1>    
            <div className="nav-in-out"style={{'display':'flex','justifyContent':'flex-end','marginRight':'3rem'}}>
            <button  onClick={()=>onRouteChange('signIn')} className='log'>Sign In</button>
            <button onClick={()=>onRouteChange('register')} className='reg '>Register</button>
            </div>    
           
            </nav>

        );
    }
    
}
export default navigation;