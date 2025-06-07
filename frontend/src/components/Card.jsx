import React from 'react'

const Card = ({ username, profile }) => {
  return (
    <div className='w-full max-w-sm bg-white flex flex-col items-center justify-center p-4 border border-gray-600 rounded-xl h-60'>

        <h2 className='text-xl font-semibold mb-2'>{username}</h2>
      {profile && (
        <img
          src={profile}
          alt={`${username}'s profile`}
          className='w-20 h-20 rounded-full object-cover'
        />
        
      )}

      <div className='mt-4'>

     

      <button className='px-3 py-3 bg-white text-black font-semibold text-lg border-2 border-gray-400   shadow-sm rounded-lg'>
        Add Friend
      </button>

       </div>
      
    </div>
  )
}

export default Card;