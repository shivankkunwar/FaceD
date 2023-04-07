import Navigation from './components/Navigation/navigation'
import './App2.css';
import React ,{ useState } from 'react';

import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';

import NewFaceCode from './components/NewFaceCode/NewFaceCode';

function App(){

  const [input, setInput] = useState<string>('');
  const [route, setRoute] = useState<string>('signIn');
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  //user details
  const [id, setId] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [entries, setEntries] = useState<number>(0);
  const [joined, setJoined] = useState(new Date());

 type dataType ={
    id:string,
    name:string,
    email:string,
    entries:number
 } 
 type routeTypes={
    Route:'signOut'|'home'|'signIn'|'register';
 }
 const changeEntries=(entries:number)=>{
  
  
  setEntries(entries);
  
}
 
  



 const loadUser=(data:dataType)=>{

    setId(data.id);
    setName(data.name);
    setEmail(data.email);
    setEntries(data.entries);
    
    
  }
  



  

 const onRouteChange=(Route:'signOut'|'home'|'signIn'|'register')=>{
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
