import React from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState , useEffect } from 'react';

const Signin = () => {

    const navigate = useNavigate();

  

    

  


   const [email,setEmail] = new useState('');
   const [Password , setPassword] = new useState('');
   const [message,setMessage] = new useState('');



   async function SubmitSignin(e){

    e.preventDefault();

    try{

        const response = await axios.post("http://localhost:3000/api/signin",{

            email:email,
            password:Password

        })

        console.log(response.data);

        if(response && response.data){
            setMessage(response.data.message);

            localStorage.setItem("token" , response.data.token)
            setEmail('');
            setPassword('');
            navigate("/home",{replace:true})
        }
        else{
            setMessage(response.data.message)
        }

    }
    catch(e){

        if(e.response && e.response.data && e.response.data.message){
            setMessage(e.response.data.message)
        }
        else{
            setMessage("Something went wrong")
        }

    }

   }

  

const token = localStorage.getItem('token');
    




function goTosignup(){
    navigate("/signup",{replace:true})
}







  return (


    <div className='min-h-screen  bg-gray-200 flex items-center justify-center'>

        <div className='bg-white p-10 rounded-2xl shadow-xl w-full  max-w-sm '>

            <h2 className='text-center text-2xl  text-gray-700 font-bold mb-8' >Login Here</h2>

            <form className='space-y-4' onSubmit={SubmitSignin}>

                     <div>
                    <label  className="block mb-1 text-xl font-semibold text-gray-500">Email</label>
                    <input value={email} onChange={(e)=>setEmail(e.target.value)} type='email'
                     
                     className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                    
                    />
                </div>

                   <div>
                    <label className="block mb-1 text-xl font-semibold text-gray-500">Password</label>
                    <input  value={Password} onChange={(e)=>setPassword(e.target.value)} type='password'
                     
                     className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                    
                    />

                </div>

                 <button type="submit" className='w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300' >
                             Login
                    </button>



            </form>

             <p className='mt-4 text-ms text-center text-gray-500'>

                 Don't have an account? <button onClick={goTosignup} className="text-blue-500 hover:underline">Sign up</button>
            </p>

            <div>
                <p className='text-lg text-center  text-red-400  font-semibold mt-10 ' >{message}</p>
            </div>


        </div>


    </div>
  )
}

export default Signin