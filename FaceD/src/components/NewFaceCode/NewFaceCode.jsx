import React from 'react';

import {useState ,useEffect } from 'react';
import Logo from '../Logo/Logo';
import NewPost from './components/NewPost';
import './App.css'

function NewFaceCode({name,id,entries,changeEntries}) {
  const [file, setFile] = useState();
  const [image, setImage] = useState();

  useEffect(() => {
    const getImage = () => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        setImage({
          url: img.src,
          width: img.width,
          height: img.height,
        });
      };
    };

    file && getImage();
  }, [file]);
  const fetchingCount=()=>{
            fetch('http://localhost:3000/image',{
              method: 'put',
              headers: {'Content-Type':'application/json'},
              body: JSON.stringify({
                  id:id
              })
        })
        .then(response=>response.json())
        .then(count=>{
        
        
        changeEntries(count)
        
})
  } 
  const Redirect=()=>{
    setImage(null);
    console.log("redirct worked")
    console.log(file)
  }
  return (
    <div className='Main-container' >
     
      {
          image?
          (
            <NewPost image={image} Redirect={Redirect} name={name}
            entries={entries} changeEntries={changeEntries} id={id}/>
          )
          
          :(
              
              <div className="newPostCard">
                <p className='MainText'style={{'fontSize':'4rem','margin':'1px'}}>SELECT A IMAGE FOR </p>
                <h2 className='MainText' style={{'fontSize':'3rem','fontWeight':'100'}}>Face Detection</h2>
              <div className="addPost">
                  <Logo/>
                  <div className="postForm">
                      <input 
                      type="text"
                      placeholder="Tell me something "
                      className='postInput'   />
                      <input 
                       onChange={(e) => {
                        setFile(e.target.files[0])
                        fetchingCount()
                        }
                        //as the new Face is detected update the entries count and display
                              
                      
                      }
                       id="file"
                       
                       type="file"
                     />

                  </div>  
              </div>
            </div>
    

          )
      }

    </div>
  )
}

export default NewFaceCode;
