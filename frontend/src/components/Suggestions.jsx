import React, { useEffect, useState } from 'react';
import Nav from './Nav';
import axios from 'axios';
import { useRef } from 'react';
import Card from './Card';

const Suggestions = () => {

    const token = localStorage.getItem('token');
    const[data , setData] = useState([]);
    const[message,setMessage] = useState('');
    const hasFetched = useRef(false);

     useEffect(()=>{

        if(hasFetched.current) return;
        hasFetched.current=true;

        async function getData() {

            try{

                

                const response = await axios.get("http://localhost:3000/api/suggestions/friends",{
                    headers:{
                        Authorization:`Bearer ${token}`,
                    }
                })

                if(response){
                    setData(response.data)
                }

            }
            catch(er){
                setMessage(er);
            }
            
        }

        getData();

     },[])

    console.log(data);

  return (
    <div className="pt-[60px] "> 
      <Nav />
      <div >

        {data.length === 0 && (
    <h2 className='mt-5 text-center text-xl text-red-400 px-2 py-2 rounded-xl shadow-sm '>No Friends Suggestions</h2>
            )}


                 <div className="flex flex-wrap gap-4 w-full bg-gray-100 border-2 border-black rounded-xl p-5 h-screen overflow-auto">

             
        {data.map((user) => (

            
                 <Card
              key={user._id}
              username={user.username}
              profile={user.profile}
            />

          
        ))}

        </div>

        

       
      </div>
    </div>
  );
};

export default Suggestions;
