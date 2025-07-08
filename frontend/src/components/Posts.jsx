const Posts = ({name, date, text, image, video }) => {
  return (

   <div className="flex items-center  flex-col w-full max-w-2xl rounded-md  px-5 py-5 gap-5 shadow-md bg-slate-400 " >
         
         <div className="text-gray-100">
      
           posted  by {name} 
           <div className="text-sm">
             on {date.substring(0,10)+" at "+ date.substring(11,19)}
           </div>
        
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
