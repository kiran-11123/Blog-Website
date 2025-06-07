import React from 'react';
import { useNavigate } from 'react-router-dom';

const Nav = () => {
  const navigate = useNavigate();

  function tohome() {
    navigate('/home', { replace: true });
  }

  function toupload() {
    navigate('/upload', { replace: true });
  }

  function toprofile() {
    navigate('/profile', { replace: true });
  }

  function tosuggestion() {
    navigate('/suggestions', { replace: true });
  }

  function tologout(){

    localStorage.removeItem('token');
    
    navigate('/' ,{replace:true})
  }

  return (
    <div className="fixed top-0 left-0 bg-slate-400 w-full px-5 h-[50px] flex items-center z-50 min-w-[300px] rounded-md">
      <ul className="flex justify-evenly font-semibold text-xl w-full">
        <li
          className="cursor-pointer hover:text-blue-800 transition duration-200 hover:shadow-md px-2 py-1 rounded-md"
          onClick={tohome}
        >
          Home
        </li>
        <li
          className="cursor-pointer hover:text-blue-800 transition duration-200 hover:shadow-md px-2 py-1 rounded-md"
          onClick={toupload}
        >
          Upload
        </li>
        <li
          className="cursor-pointer hover:text-blue-800 transition duration-200 hover:shadow-md px-2 py-1 rounded-md"
          onClick={tosuggestion}
        >
          Suggestions
        </li>
        <li
          className="cursor-pointer hover:text-blue-800 transition duration-200 hover:shadow-md px-2 py-1 rounded-md"
          onClick={toprofile}
        >
          Profile
        </li>

         <li
          className="cursor-pointer hover:text-blue-800 transition duration-200 hover:shadow-md px-2 py-1 rounded-md"
          onClick={tologout}
        >
          Logout
        </li>
      </ul>
    </div>
  );
};

export default Nav;
