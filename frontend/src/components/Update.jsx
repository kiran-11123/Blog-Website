import React, { useState } from 'react';
import axios from 'axios';
import Nav from './Nav';

const Update = () => {
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');

  const token = localStorage.getItem('token');

  async function submit() {
    const userDetails = {};

    if (email.length > 0) userDetails.email = email;
    if (password.length > 0) userDetails.password = password;
    if (mobile.length > 0) userDetails.mobile = mobile;
    if (username.length > 0) userDetails.username = username;
    if (bio.length > 0) userDetails.bio = bio;

    try {
      const response = await axios.put("http://localhost:3000/api/update", userDetails, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      if (response) {
        console.log(response);
        setMessage(response.data.message);
        setEmail('');
        setBio('');
        setPassword('');
        setMobile('');
        setUsername('');
      }
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong.");
    }
  }

  return (
    <div>
      <Nav />

      <div className='min-h-screen bg-gray-200 flex items-center justify-center mt-10'>
        <div className='bg-white p-10 rounded-2xl shadow-xl w-full max-w-lg'>
          <h2 className='text-center text-2xl text-gray-700 font-bold mb-8'>Update Here</h2>

          <form className='space-y-4' onSubmit={(e) => { e.preventDefault(); submit(); }}>
            <div>
              <label className="block mb-1 text-xl font-semibold text-gray-500">UserName</label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type='text'
                className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>

            <div>
              <label className="block mb-1 text-xl font-semibold text-gray-500">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type='email'
                className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>

            <div>
              <label className="block mb-1 text-xl font-semibold text-gray-500">Mobile</label>
              <input
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                type='text'
                className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>

            <div>
              <label className="block mb-1 text-xl font-semibold text-gray-500">Bio</label>
              <input
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>

            <div>
              <label className="block mb-1 text-xl font-semibold text-gray-500">Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type='password'
                className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>

            <button type="submit" className='w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300'>
              Update
            </button>
          </form>

          <div>
            <p className='text-lg text-center text-green-600 font-semibold mt-10'>{message}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Update;
