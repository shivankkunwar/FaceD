import React from 'react';
import "./SignIn.css"
class SignIn extends React.Component{
    constructor(props){
        super(props);
        this.state={
            signInEmail: '',
            signInPassWord: ''
        }
    }

    onEmailChange=(event)=>{
        this.setState({signInEmail:event.target.value})
    }

    onPasswordChange=(event)=>{
        this.setState({signInPassWord:event.target.value})
    }
    
    onSubmitSignIn =()=>{
        fetch('http://localhost:3000/signin', {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                email:this.state.signInEmail,
                password:this.state.signInPassWord
            })
        })
        .then(response=>response.json())
        .then(user=>{
            console.log(user.id);
            if(user.id){
                console.log("clicked");
                this.props.loadUser(user)
               console.log("loaded")
               this.props.onRouteChange('home');
            } 
        })
        
       
    }
    
    
    render(){
        const { onRouteChange } = this.props;
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
                    onChange={this.onEmailChange}
                    />
                </div>
                <div className="mv3">
                    <label className="db fw lh-copy f6" htmlFor="password">Password</label>
                    <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                    type="password" 
                    name="password"  
                    id="password"
                    onChange={this.onPasswordChange}
                    />
                </div>
                
                </fieldset>
                <div className="">
                <input
                    onClick={this.onSubmitSignIn}
                    className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                    type="submit" 
                    value="Sign in"/>
                </div>
                <div className="lh-copy mt3">
                <p onClick={()=>onRouteChange('register')} href="" className="f6 link dim black db pointer">Register</p>
              
                </div>
            </div>
            </main>
            
            </article>
        )


    }
            
      
    
}
export default SignIn;