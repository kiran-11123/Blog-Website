import React, { useEffect, useState } from 'react'
import Nav from './Nav'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Posts from './Posts';

const Profile = () => {
  
  const[activetab ,setActiveTab] = useState('profile');
  const token = localStorage.getItem('token');
  const[email ,setEmail] = useState('');
  const[username,setUsername] = useState('');
  const[mobile,setMobile] = useState('');
  const[bio , setBio] = useState('');
  const navigate = useNavigate();
  const [mydatacontent , setmydatacontent] = useState([]);
  const [message , setMessage] = useState('');



  useEffect(()=>{


    

async function getMydata() {
  try {
    const response = await axios.get("http://localhost:3000/api/content/myposts", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const posts = response.data.myposts;

    if (posts && posts.length > 0) {
      console.log(posts); 
      setmydatacontent(posts); 
    } else {
      setMessage("No Posts Yet");
    }

  } catch (error) {
    console.error("Error fetching posts:", error);
    setMessage("Failed to load posts");
  }
}




     async function getDetails(){
       const response = await axios.get("http://localhost:3000/api/all_details",{
        headers:{
          Authorization:`Bearer ${token}`,
        }
       })

       if(response){
        console.log(response)
        
       setEmail(response.data.user_details.email)

       setBio(response.data.user_details.bio);

       setUsername(response.data.user_details.username);
       setMobile(response.data.user_details.mobile)
     }   
     }

      getDetails();
      getMydata();

  },[])

  function toupdate(){
     navigate("/update");
  }





  return (
    <div>
        <Nav />

        <div className='mt-[50px]'>

         <div className='flex flex-col  w-full h-[calc(100vh-50px)] rounded-md'>


         <ul className='flex items-start justify-evenly gap-10 font-bold text-xl w-full   px-5 py-5 '>
        <li className={`cursor-pointer hover:text-blue-500 rounded-md hover:shadow-sm px-3 py-2  ${
                activetab === 'profile' ? 'bg-blue-100 text-blue-600 shadow' : ''
              }` } onClick={()=>setActiveTab('profile')}>My Profile</li>


        <li className={`cursor-pointer hover:text-blue-500 rounded-md hover:shadow-sm px-3 py-2 ${activetab==='posts' ? 'bg-blue-100 text-blue-600 shadow' : ''}`}
         onClick={()=>setActiveTab('posts')}>My Posts</li>
         </ul>
         
              <div className='p-2 flex-1 overflow-auto'>
                {activetab === 'profile' && (
                  <div className='flex flex-1 justify-center items-start h-full w-full'>
                    <div className='shadow-lg border-2 rounded-md w-full h-full px-5 py-5  flex items-start justify-center '>
                        <form className='space-y-4 w-full '>

                          <div className="mb-2">
                                            <label className="block mb-2 text-2xl font-semibold text-gray-700">Username</label>
                                            <input
                                              type="text"
                                              value={username}
                                              readOnly
                                              className="w-full px-10 py-4 border rounded-lg text-lg bg-gray-50 cursor-not-allowed"
                                            />
                                          </div>



                                          <div className="mb-2">
                                            <label className="block mb-2 text-2xl font-semibold text-gray-700">Email</label>
                                            <input
                                              type="email"
                                              value={email}
                                              readOnly
                                              className="w-full px-10 py-4 border rounded-lg text-lg bg-gray-50 cursor-not-allowed"
                                            />
                                          </div>

                                          <div className="mb-2">
                                            <label className="block mb-2 text-2xl font-semibold text-gray-700">Bio</label>
                                            <input
                                              type="text"
                                              value={bio}
                                              readOnly
                                              className="w-full px-10 py-4 border rounded-lg text-lg bg-gray-50 cursor-not-allowed"
                                            />
                                          </div>

                                          <div className="mb-3">
                                            <label className="block mb-2 text-2xl font-semibold text-gray-700">Phone</label>
                                            <input
                                              type="tel"
                                              value={mobile}
                                              readOnly
                                              className="w-full px-10 py-4 border rounded-lg text-lg bg-gray-50 cursor-not-allowed"
                                            />
                            </div>


                            <button className='px-5 py-2 border rounded-lg text-lg bg-green-300 ' onClick={toupdate}>
                              Update Details
                            </button>
                                


                        

                      </form>

                      
                    </div>
                  </div>
                  )}

{activetab === 'posts' && (
  <div className="flex justify-center items-start h-full w-full bg-gray-50">
    
  
    <div className="w-full max-w-4xl bg-white border border-gray-200 shadow-md rounded-xl p-6 mt-6 overflow-y-auto">
       
    
     
      {mydatacontent.length === 0 ? (
        <div className="text-center text-lg font-semibold text-gray-500 py-10">
          {message}
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {mydatacontent.map((record) => (
            <div key={record.post_id} className="w-full">
              <Posts 
                date={record.createdAt}
                name={username}
                text={record.text}
                showdelete={true}
                id={record.post_id}
                image={record.image}
                video={record.video}
              />
            </div>
          ))}
        </div>
      )}
      
    </div>
  </div>
)}

 

                   
            



         

         </div>



          </div>

        </div>
        
    </div>
  )
}

export default Profile