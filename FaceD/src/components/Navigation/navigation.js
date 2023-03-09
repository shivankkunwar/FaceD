import React from 'react';
import "./navigation.css"
const navigation=({onRouteChange, isSignedIn })=>{
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
            <div style={{'display':'flex','justifyContent':'flex-end','marginRight':'3rem'}}>
            <p  onClick={()=>onRouteChange('signIn')} className='f3 link grow pointer b--black-10  pointer mw6   br-pill   but'>Sign In</p>
            <p onClick={()=>onRouteChange('register')} className='f3 link  grow  pointer b--black-10  pointer mw6   br-pill   but '>Register</p>
            </div>    
           
            </nav>

        );
    }
    
}
export default navigation;