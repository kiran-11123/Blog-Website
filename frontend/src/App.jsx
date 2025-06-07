import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route ,Routes } from 'react-router-dom'
import Signin from './components/Signin'
import Signup from './components/Signup'
import Home from './components/Home'
import Profile from './components/Profile'
import Suggestions from './components/Suggestions'
import Upload from './components/Upload'

function App() {
 

  return (
    <BrowserRouter>


    <Routes>

     <Route path="/" element={<Signin />} > </Route>
     <Route path="/signup" element={<Signup />} />
     <Route path="/home" element={<Home/>} />
     <Route path="/profile" element={<Profile/>} />
     <Route path="/suggestions" element={<Suggestions />} />
     <Route path="upload" element={<Upload />} />
  


      
    </Routes>
    
    
    
    
    </BrowserRouter>
  )
}

export default App
