import React, { useState } from 'react'
import Nav from './Nav'
import axios from 'axios';

const Upload = () => {

  const[message,setMessage] = useState('');
  
  const[text,setText] = useState('');
  const[imageFile,setImage] = useState(null);
  const[videoFile,setVideo] = useState(null);
  const token = localStorage.getItem('token');

  
  async function uploadsubmit(e){
    e.preventDefault();

    

    const formData = new FormData();

    if(text.length>0){
      formData.append('text',text);
    }
    if(imageFile){
      formData.append('image',imageFile)
    }
    if(videoFile){
      formData.append('video',videoFile)
    }

    try{
         
      const response = await axios.post("http://localhost:3000/api/add-data/add",formData,{
         headers:{
          
          Authorization:`Bearer ${token}`,
         }
      })

      if(response){
        setMessage(response.data.message);
        
      }

        setText('');
        setImage(null);
        setVideo(null);

    }

    catch(er){
      setMessage(er?.response?.data?.message || er.message || "Upload failed");
    }
  }





  return (
 <div>
  <Nav />

  <div className="mt-[50px] h-[calc(100vh-50px)] w-screen  rounded-lg overflow-hidden ">
     <div className='px-5 py-5 mt-[10px] text-center font-bold text-xl'>

       <h2>Share Your Thoughts    </h2>

     </div>

     <div className='  bg-gray-200 flex items-start justify-center shadow-lg border-2 mt-2 rounded-md h-full w-full px-5 py-5 '>

       <div className='bg-white p-10 rounded-2xl shadow-xl w-full  max-w-2xl '>

        <form className='space-y-4' onSubmit={uploadsubmit}>

                   <div>
                    <label  className="block mb-1 text-xl font-semibold text-gray-500">Tweet</label>
                    <textarea
                    rows="4"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    placeholder="Enter your message"    onChange={(e)=>setText(e.target.value)}
                  > </textarea>

                  </div> 

                      <div>
                    <label  className="block mb-1 text-xl font-semibold text-gray-500">Image</label>
                    <input  type='file' accept="image/*"
                     
                     className='w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer '
                   

                     onChange={(e)=>setImage(e.target.files[0])}
                    
                    />

                 

                  </div> 

                   <div>
                    <label  className="block mb-1 text-xl font-semibold text-gray-500">Video</label>
                    <input  type='file' accept='video/*'
                     
                     className='w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer'
                     
                     onChange={(e)=>setVideo(e.target.files[0])}
                    
                    />

                 

                  </div> 

                
                
        <button type='submit' className='px-5 py-2  bg-green-400 mt-5 rounded-md font-semibold justify-center items-center' >
             Upload
        </button>






        </form>


        <div className='font-bold text-xl text-red-600 text-center px-5 py-5'>
           {message?.message || message}
        </div>

       </div>

     </div>
  </div>
</div>


  )
}

export default Upload
