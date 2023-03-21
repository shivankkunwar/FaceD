import Navigation from './components/Navigation/navigation'
import './App.css';
import React ,{ useState } from 'react';

import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';

import NewFaceCode from './components/NewFaceCode/NewFaceCode';

function App(){

  const [input, setInput] = useState('');
  const [route, setRoute] = useState('signIn');
  const [isSignedIn, setIsSignedIn] = useState(false);
  //user details
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [entries, setEntries] = useState(0);
  const [joined, setJoined] = useState(new Date());

  
 const changeEntries=({entries})=>{
  
  
  setEntries(entries);
  
}
 
  



 const loadUser=(data)=>{

    setId(data.id);
    setName(data.name);
    setEmail(data.email);
    setEntries(data.entries);
    setJoined(data.joined);
    
  }
  



  

 const onRouteChange=(Route)=>{
    if(Route==='signOut'){
      setIsSignedIn(false);
      
      
    }else if(Route==='home'){
      setIsSignedIn(true);
    }
    setRoute(Route);
  }
  
    
    return(
      
      <div className='App'>
       
        <Navigation isSignedIn={isSignedIn}  onRouteChange={onRouteChange} />
        {

          (route==='home')
          ?
          <div>
            
            <NewFaceCode name={name}
            entries={entries} id={id} changeEntries={changeEntries} />
       
          
        
        </div>
        
           
          :(
            route==='signIn'
          ?
          <SignIn loadUser={loadUser} onRouteChange={onRouteChange}/>
          :
          <Register loadUser={loadUser} onRouteChange={onRouteChange}/>
          )

        }
       
      </div>
    );
  }



// function App() {
//   return (
//     <div className="App">
//       <Navigation />
//     </div>
//   );
// }

export default App;
