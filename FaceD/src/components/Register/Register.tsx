import React ,{useState}from 'react';
import "./Register.css"
type registerTypes={
    loadUser:any,
    onRouteChange:any
}
function Register (props:registerTypes){
    //states
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const onEmailChange=(event:any)=>{
        setEmail(event.target.value);
    }
    const onPasswordChange=(event:any)=>{
        setPassword(event.target.value);
    }
   const onNameChange=(event:any)=>{
        setName(event.target.value);
    }

    const onSubmitRegistration=()=>{
        fetch('http://localhost:3000/register', {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                email:email,
                password:password,
                name:name
            })
        })
        .then(response=>response.json())
        .then( user =>{
          if(user.id){
            props.loadUser(user);
            props.onRouteChange('home');
          } 
        }).catch(err=>console.log(`error here ${err}`))
        
    }
   
    
        //const { onRouteChange} = this.props.onRouteChange;
        return (
            <article className=" bgN br3 ba  b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
            <main className="pa4 black-80">
            <div className="measure ">
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f4 fw6 ph0 mh0">Register</legend>
                <div className="mt3">
                    <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                    <input 
                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                    type="text" 
                    name="name"  
                    id="name"
                    onChange={onNameChange}
                    />
                </div>
                <div className="mt3">
                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                    <input
                     className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                     type="email" 
                     name="email-address"  
                     id="email-address"
                     onChange={onEmailChange}
                     />
                </div> 
                <div className="mv3">
                    <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
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
                    // onClick={()=>onRouteChange('home')}
                    onClick={onSubmitRegistration}
                    className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                    type="submit" 
                    value="Register"/>
                </div>
            
            </div>
            </main>
            
            </article>
        )
    }
        
    
   

export default Register;