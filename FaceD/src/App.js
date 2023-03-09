import Navigation from './components/Navigation/navigation'
import './App.css';
import React ,{ Component } from 'react';

import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';

import NewFaceCode from './components/NewFaceCode/NewFaceCode';

class App extends Component{

  constructor(){
    super();
    this.state={
      input:'',
      
      route:'signIn',
      isSignedIn:false,
      user:{
      id:'',
      name:'',
      email:'',
      password: '',
      entries: '0',
      joined:'new Date()'
    }
    }
  }
  
 changeEntries=({entries})=>{
  
  
  this.setState(Object.assign(this.state.user, { entries: entries}))
  
}
 
  

  displayFaceBox = (box) => {
    this.setState({box: box})
  }

  loadUser=(data)=>{
    this.setState({user:{
      id:data.id,
      name:data.name,
      email:data.email,
     
      entries:data.entries,
      joined:data.joined
    }})
  }
  

  onInputChange=(event)=>{
     this.setState({input:event.target.value})
  }
  onSubmit=()=>{
    console.log('click');
  }

  

  onRouteChange=(Route)=>{
    if(Route==='signOut'){
      this.setState({isSignedIn: false})
      this.setState({imageUrl: ''})
    }else if(Route==='home'){
      this.setState({isSignedIn: true})
    }
    this.setState({route:Route})
  }
  render(){
    const {  route, isSignedIn  } =this.state ;
    return(
      
      <div className='App'>
       
        <Navigation isSignedIn={isSignedIn}  onRouteChange={this.onRouteChange} />
        {

          (route==='home')
          ?
          <div>
            
            <NewFaceCode name={this.state.user.name}
            entries={this.state.user.entries} id={this.state.user.id} changeEntries={this.changeEntries} />
       
          
        
        </div>
        
           
          :(
            route==='signIn'
          ?
          <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          :
          <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          )

        }
       
      </div>
    );
  }
}


// function App() {
//   return (
//     <div className="App">
//       <Navigation />
//     </div>
//   );
// }

export default App;
