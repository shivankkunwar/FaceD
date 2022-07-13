import Navigation from './components/Navigation/navigation'
import './App.css';
import React ,{ Component } from 'react';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Clarifai from 'clarifai';
import FaceRecognition from './components/FaceRecongintion/FaceRecognition'
const app = new Clarifai.App({
  apiKey: ''
})
class App extends Component{

  constructor(){
    super();
    this.state={
      input:'',
      imageUrl: '',
      box: {},
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
 
  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  };

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

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL, 
        this.state.input)
      .then(response => {
        console.log('hi', response)
        if (response) {
          fetch('http://localhost:3000/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              console.log(count)
              this.setState(Object.assign(this.state.user, { entries: count.entries}))
            })

        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      }
      ).catch(err => console.log(err))
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
    const {  route, isSignedIn , imageUrl , box} =this.state ;
    return(
      
      <div className='App'>
       
        <Navigation isSignedIn={isSignedIn}  onRouteChange={this.onRouteChange} />
        {
          (route==='home')
          ?
          <div>
       
          <Logo/>
          <Rank
            name={this.state.user.name}
            entries={this.state.user.entries}
            />
          <ImageLinkForm 
          onInputChange={this.onInputChange} 
          onButtonSubmit={this.onButtonSubmit}
          />
          <FaceRecognition box={box} imageUrl={imageUrl}/>
        
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
