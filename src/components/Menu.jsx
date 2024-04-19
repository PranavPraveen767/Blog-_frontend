import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import axios from 'axios'
import { BASE_URL } from '../Services/baseURL'
import { Link } from 'react-router-dom'

function Menu() {
    const {user}=useContext(UserContext)
    const {setuser}=useContext(UserContext)
  

  const handlelogout=async()=>{
    try {
      const res=await axios.get(BASE_URL+"/logout",{withCredentials:true})
      console.log(res);
      setuser(null)
      
    } catch (err) {
      console.log(err);
      
    }
  }
  return (
    <div className='bg-zinc-950 w-[200px] flex flex-col items-start absolute top-12 right-8 rounded-lg p-5 space-y-4'>
        {!user &&<Link to={'/login'} className='text-white  hover:text-gray-600'> Login</Link>}
         {!user && <Link to={'/register'} className='text-white  hover:text-gray-600'>Register</Link>}
      {user && <Link to={'/profile/'+user._id} className='text-white  hover:text-gray-600'>Profile</Link>}
      {user && <Link to={'/write'} className='text-white hover:text-gray-600'>Write</Link>}

          {user && <Link to={'/myblogs'+user._id} className='text-white  hover:text-gray-600'>My Blogs</Link>}
          {user && <button onClick={handlelogout} className='text-white  hover:text-gray-600'>logout</button>}

    </div>
  )
}

export default Menu