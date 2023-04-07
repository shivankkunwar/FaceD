import React from 'react'
import { useState,useRef,useEffect } from 'react'
import * as faceapi from "face-api.js";
type imageType={
  url:string,
  width:number,
  height:number
}
type newPostType={
  image:imageType,
  Redirect:any,
  name:string,
  id :string,
  entries:any,
  changeEntries:any
}
// type faceType={
//   x:number, y:number, width:number, height:number
// } this was un nessasary

const NewPost = ({image,Redirect, name ,id,entries,changeEntries }:newPostType) => {

  const { url , width, height} = image;
  const [faces, setFaces] = useState<any[]>([]);
//face gets a array having 4 component x,y,width,height as 0,1,2,3 position of array

  const imgRef= useRef<any>();
  const canvasRef=useRef(null);
  // manipulating canvas dimenstion from api to fit the Face
  const handleImage = async()=>{
    
    const detections= await faceapi
                      .detectAllFaces(imgRef.current,new faceapi.TinyFaceDetectorOptions())
                      
    console.log(detections)
    setFaces(detections.map((d)=> Object.values(d.box)));
   
    // canvasRef.current.innerHtml =faceapi.createCanvasFromMedia(imgRef.current);   
    // faceapi.matchDimensions(canvasRef.current, {
    //   width:940,
    //   height:650
    // });
    // console.log(canvasRef.current)
    // const resized = faceapi.resizeResults(detections,{
    //   width:940,
    //   height:650
    // });
    // faceapi.draw.drawDetections(canvasRef.current,resized);   
    // faceapi.draw.drawFaceExpressions(canvasRef.current,resized);
    // faceapi.draw.drawFaceLandmarks(canvasRef.current, resized);            
  }
  //a Function to Enter new Images for face detection
 
  //function to Draw canvas
  const enter = () => {
    if(!canvasRef.current)return;
    const cur=canvasRef.current as HTMLCanvasElement;
    const ctx = cur.getContext("2d");
    if(!ctx)return;
    ctx.lineWidth = 20;
    ctx.strokeStyle = "yellow";
    console.log(faces)
    faces.map((face) => ctx.strokeRect(face[0],face[1],face[2],face[3]));
    
   
    
  };
  //a useEffect hook that loads model and runt the above function
  useEffect(()=>{
    const loadModels=()=>{
      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
        faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
       
        faceapi.nets.faceExpressionNet.loadFromUri("/models")
  
      ])
      .then(handleImage)
      .catch((e)=> console.log(e))
    }
   
    imgRef.current&& loadModels();
   
  },[])
  useEffect(()=>{
      enter();
  },[faces])

  return (
      <div className="container">
          <div className="left" >
            <img ref={imgRef}  crossOrigin="anonymous" src={url} alt="" />
            <canvas
              // onMouseEnter={enter}
              ref={canvasRef}
              width={width}
              height={height}
            /> 
          </div>

          <div className="right">
              <p className='MainText' style={{'fontSize':'2rem'}}>Session : {entries.entries}</p>
              <h1 className='MainText' style={{'fontSize':'4rem','margin':'1rem'}}>{name}! You have Detected  </h1>
              <h2 className='MainText' style={{'fontSize':'3rem'}}>Faces: {faces.length}</h2>
              <button className='rightButton' onClick={Redirect}>Try again?</button>

          </div>

      </div>




    // <div>
    //     <img
    //   crossOrigin='anonymous'
    //    ref={imgRef}
    //    src="https://i.weltbild.de/p/love-guide-die-ultimativen-liebes-geheimnisse-333814574.jpg?v=1&wp=_max"
    //    alt=""
    //    width="940"
    //    height="650" />
    //    <canvas
    //    ref={canvasRef}
    //     width="940"
    //    height="650" />
    // </div>
  )
}

export default NewPost