import React from 'react';
import "./navigation.css"
const navigation=({onRouteChange, isSignedIn })=>{
    if(isSignedIn){
        return (
            <nav style={{'display':'flex','justifyContent':'flex-end'}}>
              
                <p onClick={()=>onRouteChange('signOut')} className='f3 link dim black pa3 pointer but'>Sign Out</p>
            </nav>
        );
    }else{
        return (
            <nav style={{'display':'flex','justifyContent':'flex-end'}}>
            <p  onClick={()=>onRouteChange('signIn')} className='f3 link b--black-10 pa3 pointer mw6   br3 ba  but'>Sign In</p>
            <p onClick={()=>onRouteChange('register')} className='f3 link  grow pa3 pointer b--black-10 pa3 pointer mw6   br3 ba  but '>Register</p>
            </nav>

        );
    }
    
}
export default navigation;