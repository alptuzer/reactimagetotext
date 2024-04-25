import React, { Component } from 'react';
import './App.css';
import { useState,useEffect } from 'react';
import {createWorker} from 'tesseract.js'
function App() {

 // tesseract.js
  const [selectedImage,setSelectedImage]  = useState(null);
  const [textResult,setTextResult]  = useState("dfgdfgdfgd");


  const worker = createWorker();

  
  const convertImageToText = async () => {
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    const { data } = await worker.recognize(selectedImage);
    console.log(data);
    await worker.terminate();
    setTextResult(data.text);
  }
  useEffect(()=>{
    convertImageToText();
  },[selectedImage])

  const handleChange = (e) =>{
    setSelectedImage(e.target.files[0])
  }
  
    return (
      <div className="App">
        <h1> Image To Text </h1>
        <p>Get Words in Image</p>
        <div className='input-wrapper'>

          <label htmlFor='upload'> Upload Image </label>
          <input type="file" id="upload" accept='image/*' onChange={handleChange}></input>
        </div>
        <div className='result'>
          {selectedImage && (
            <img src={URL.createObjectURL(selectedImage)} alt="thumbnail"></img>
          )}
          { textResult && (
            <div className='box-p'>
              <p>{textResult}</p>
            </div>
          )}
        </div>
      </div>
    );
  }


export default App;
