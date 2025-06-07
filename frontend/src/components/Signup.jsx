import React from 'react'
import { useState ,useEffect} from 'react'
import axios from 'axios'
import { replace, useNavigate } from 'react-router-dom';

const Signup = () => {

    


     const[username ,setUsername] = useState('');
     const[email,setEmail] = useState('');
     const[mobile ,setMobile] = useState('');
     const[password,setPassword] = useState('');
     const[message,setMessage] = useState('');

     const navigate=useNavigate();



    async  function signupsubmit(e){
        e.preventDefault();

        try{

        const response  =await axios.post("http://localhost:3000/api/signup/user" ,{
            username:username,
            email:email,
            mobile:mobile,
            password:password
        })

        console.log(response.data.message);

        if(response.data.message){
            setEmail('')
            setMobile('');
            setPassword('');
            setUsername('');
            setMessage(response.data.message);
        }
     
    }

    catch(er){
         
        setMessage(er);
    }



     }
    

     function goTosignin(){
        navigate("/",{replace:true})
     }








  return (
    
    
    <div className='min-h-screen  bg-gray-200 flex items-center justify-center'>

        <div className='bg-white p-10 rounded-2xl shadow-xl w-full  max-w-lg '>

            <h2 className='text-center text-2xl  text-gray-700 font-bold mb-8' >Register Here</h2>

            <form className='space-y-4' onSubmit={signupsubmit}>

                     <div>
                    <label  className="block mb-1 text-xl font-semibold text-gray-500">UserName</label>
                    <input value={username} onChange={(e)=>setUsername(e.target.value)} type='text'
                     
                     className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                    
                    />
                </div>

                   <div>
                    <label className="block mb-1 text-xl font-semibold text-gray-500">Email</label>
                    <input  value={email} onChange={(e)=>setEmail(e.target.value)} type='email'
                     
                     className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                    
                    />

                </div>

                 <div>
                    <label className="block mb-1 text-xl font-semibold text-gray-500">Mobile</label>
                    <input  value={mobile} onChange={(e)=>setMobile(e.target.value)} type='text'
                     
                     className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                    
                    />

                </div>


                 <div>
                    <label className="block mb-1 text-xl font-semibold text-gray-500">Password</label>
                    <input  value={password} onChange={(e)=>setPassword(e.target.value)} type='password'
                     
                     className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                    
                    />

                </div>

                 <button type="submit" className='w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300' >
                             Register
                    </button>



            </form>

             <p className='mt-4 text-ms text-center text-gray-500'>

                 Already Registered? <button onClick={goTosignin} className="text-blue-500 hover:underline">Login</button>
            </p>

            <div>
                <p className='text-lg text-center  text-red-400  font-semibold mt-10 ' >{message}</p>
            </div>


        </div>


    </div>
  )
}

export default Signup