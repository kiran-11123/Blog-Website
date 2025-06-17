import React from 'react'
import { useNavigate } from 'react-router-dom'
import Nav from './Nav'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import Posts from './Posts'
'use client';

const Home = () => {
  const token = localStorage.getItem('token');

  const [data,setData] = useState([]);
  const [message , setMessage] = useState('');


  async function getUserName( id){

      const response = await axios.get(`http://localhost:3000/api/getUser/${id}`);

      return response.data.name;

  }

  async function getAllData(){
       
    const response  =await axios.get("http://localhost:3000/api/content/data",{
       headers :{
        Authorization :`Bearer ${token}`
      }
    });

    const posts = response.data.posts;

      if (posts.length > 0) {
        // Fetch all usernames in parallel
        const postsWithUsernames = await Promise.all(posts.map(async (post) => {
          const name = await getUserName(post.user_id);
          return {
            ...post,
            name
          };
        }));

        setData(postsWithUsernames);
      } else {
        setMessage("No Posts To show");
      }

    } 


  

  useEffect(()=>{

    getAllData();
     
  } ,[])
  
  console.log(data);


  return (

    

    <div className >

    
        <Nav/>

      
      
     
        <div className='pt-[60px] overflow-auto flex flex-col px-5 py-5 bg-slate-100 h-screen w-screen text-black text-xl font-semibold items-center '>
              
              {message.length>0  &&(<div className='text-center font-bold text-xl '> {message} </div>)}
              

                <div className="flex flex-col items-center gap-6 mt-10 px-4 w-full">
                  {data.map((record) => (
                    
                    <div key={record.post_id} className="w-full flex justify-center">
                      <Posts 
                        name = {record.name}
                        text={record.text}
                        image={record.image}
                        video={record.video}
                      />
                    </div>
                  ))}
                </div>


 
        </div>


      </div>





  )
}

export default Home