import React,{useState} from 'react';
import "./SignIn.css"
type signInTypes={
    loadUser:any,
    onRouteChange:any
}
function SignIn (props:signInTypes){
   
    const [signInEmail, setSignInEmail] = useState<String>('');
    const [signInPassWord, setSignInPassWord] = useState<String>('');
   const onEmailChange=(event:any)=>{
        setSignInEmail(event.target.value);
    
    }

   const onPasswordChange=(event:any)=>{
        setSignInPassWord(event.target.value);
    }
    
   const  onSubmitSignIn =()=>{
        fetch('http://localhost:3000/signin', {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                email:signInEmail,
                password:signInPassWord
            })
        })
        .then(response=>response.json())
        .then(user=>{
            
            if(user.id){
                
                props.loadUser(user)
              
               props.onRouteChange('home');
            } 
        })
        
       
    }
    
    
   
        const { onRouteChange } = props;
        return(
            <article className=" txt bgN  b br3 ba  b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-2 center">
            <main className="pa4 black-80 bgN ">
            <div className="measure ">
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f4 fw ph0 mh0">Sign In</legend>
                <div className="mt3">
                    <label className="db fw lh-copy f6" htmlFor="email-address">Email</label>
                    <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                    type="email"
                    name="email-address"  
                    id="email-address"
                    onChange={onEmailChange}
                    />
                </div>
                <div className="mv3">
                    <label className="db fw lh-copy f6" htmlFor="password">Password</label>
                    <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                    type="password" 
                    name="password"  
                    id="password"
                    onChange={onPasswordChange}
                    />
                </div>
                
                </fieldset>
                <div className="">
                <input
                    onClick={onSubmitSignIn}
                    className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                    type="submit" 
                    value="Sign in"/>
                </div>
                <div className="lh-copy mt3">
                <p onClick={()=>onRouteChange('register')}  className="f6 link dim black db pointer">Register</p>
              
                </div>
            </div>
            </main>
            
            </article>
        )


    }
            
      
    

export default SignIn;