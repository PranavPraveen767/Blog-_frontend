import React, { useContext, useState } from 'react'
import { Link, useAsyncValue, useLocation, useNavigate } from 'react-router-dom'
import { LuSearch } from "react-icons/lu";
import { FaBarsStaggered } from "react-icons/fa6";
import Menu from './Menu';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import { BASE_URL } from '../Services/baseURL';

function Navbar() {
  const [prompt, setPrompt] = useState("")
  console.log(prompt);
  const navigate = useNavigate()

  const path = useLocation().pathname



  const { setUser } = useContext(UserContext)



  const [menu, setMenu] = useState(false)
  const handlelogout = async () => {
    try {
      const res = await axios.get(BASE_URL + "/logout", { withCredentials: true })
      console.log(res);
      setUser(null)

    } catch (err) {
      console.log(err);

    }
  }


  const showMenu = () => {
    setMenu(!menu)
  }
  const { user } = useContext(UserContext)
  console.log(user);
  return (
    <>

      <div className='flex items-center justify-between px-6 md:px-[200px] py-4  text-black font-kurale'  >
        <h1 className=' text-lg md:text-xl font-extrabold'><Link to='/'>Blogify</Link></h1>
      { path==="/home" &&  <div className='flex justify-center items-center space-x-0'>
          <button onClick={() => navigate(prompt ? "?search=" + prompt : navigate("/home"))}><LuSearch size={25} /></button>
          <input onChange={(e) => setPrompt(e.target.value)} type="text" className='outline-sky-500 px-3 ' style={{ width: '200px', height: '30px', color: 'darkcyan' }} placeholder='Search Post' />

        </div>}
        <div className=' hidden md:flex items-center justify-center space-x-2 md:space-x-4'>
          {user ? <h3><Link to='/write'>Write</Link></h3> : <h3><Link to='/login' >Login</Link></h3>}
          {user ? <Link to={'/profile/'+user._id}>Profile</Link> : <h3><Link to='/register'>Register</Link></h3>}
          {user && <Link to={'/myblogs/'+user._id}>My Blogs</Link>}
          {user && <button onClick={handlelogout}>Logout</button>}
        </div>
        <div onClick={showMenu} className='md:hidden '>
          <button><FaBarsStaggered size={25} /></button>
          {menu && <Menu />}
        </div>
      </div>
    </>

  )
}

export default Navbar