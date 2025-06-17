const Posts = ({name,  text, image, video }) => {
  return (

   <div className="flex items-center  flex-col w-full max-w-4xl rounded-md h-80 px-10 py-10 gap-20 shadow-md bg-slate-400 " >
         
         <div className="text-center" > Uploaded by {name} </div>
 
    <div className="border rounded-lg shadow-sm p-3 max-w-sm w-full  bg-white space-y-2 mt-10 justify-center">

      
      {text && (
        <p className="text-sm text-gray-800 text-center">
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
