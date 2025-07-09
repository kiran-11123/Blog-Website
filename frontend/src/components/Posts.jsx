import axios from 'axios'
import { useState } from 'react';

const Posts = ({name, date, text, image, video ,showdelete ,id}) => {

  const[message,setMessage] = useState('');

 async function deletepost(postId) {
  console.log("Attempting to delete:", postId); 

  try {
    const response = await axios.delete("http://localhost:3000/api/add-data/remove", {
      data: { post_id: postId }
    });

    console.log("Response:", response); 
    setMessage("Post deleted successfully");
  } catch (error) {
   
    setMessage("Error deleting post");
  }
}


  
  return (

   <div className="flex   flex-col w-full max-w-2xl rounded-md  px-5 py-5 gap-5 shadow-md bg-slate-400 " >
                    <div className="text-sm text-black flex flex-wrap items-center justify-between px-2">
              <span>
                <span className="font-medium text-gray-700">Posted by:</span> {name}
              </span>
              <span>
                <span className="font-medium text-gray-700">on:</span> {date.substring(0, 10)} at {date.substring(11, 19)}
              </span>
              
              {showdelete==true &&(

                <span>
                  <button className="px-2 rounded bg-slate-100 text-red-700 font-bold" onClick={() => deletepost(id)}>delete</button>
                
               </span>

              )}
              
            </div>



           
 
    <div className="border rounded-lg shadow-sm p-3  w-full  bg-white space-y-2  ">

      
      {text && (
        <p className="text-sm text-gray-800  font-semibold  text-start">
          {text}
        </p>
      )}

     
      {image && (
        <img
          src={image}
          alt="Post"
          className="w-full h-48 object-cover rounded"
        />
      )}

      
      {video && (
        <video controls className="w-full h-48 rounded">
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

    </div>

  </div> 
  );
};

export default Posts;
