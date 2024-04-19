import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'
import logo from '../image/logo.png'
import axios from 'axios'
import { BASE_URL } from '../Services/baseURL'
import { UserContext } from '../context/UserContext'

function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error,setError]=useState(false)
    const {setUser}=useContext(UserContext)
    const navigate=useNavigate()

    const handleLogin=async(e)=>{
        e.preventDefault()
        try {
            const res= await axios.post(BASE_URL+"/login",{email,password},{withCredentials:true})
            console.log("login successfull");
            setUser(res.data);
            navigate("/home")


            if (res.status === 200) {
                sessionStorage.setItem('existinguser', JSON.stringify(res.data));
                sessionStorage.setItem('token', JSON.stringify(res.data._id));
                console.log(res.data);
            }
            
        } catch (err) {
            setError(true)
            console.log(err);
            
        }
    }
    return (
        <>
            <div className='flex items-center justify-between px-6 md:px-[200px] py-4 font-custom'>
                <h1 className=' text-lg md:text-xl font-extrabold'><Link to='/'>Blogify</Link></h1>
                <h3><Link to='/register'>Register</Link></h3>
                </div>

            
            <div className="flex h-screen w-full items-center justify-center  bg-gray-900 bg-cover bg-no-repeat" style={{ backgroundImage:`url("https://w.wallhaven.cc/full/ex/wallhaven-exrqrr.jpg")`}}>
                <div className="rounded-xl bg-gray-800 bg-opacity-50 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8">
                    <div className="text-white">
                        <div className="mb-8 flex flex-col items-center">
                            <img src={logo} width="150" alt=""  />
                            <h1 className="mb-2 text-2xl">Blogify</h1>
                            <h1 className='text-xl font-bold text-center'>Login In To Your Account</h1>
                        </div>
                        <form action="#">
                            <div className="mb-4 text-lg">
                                <input onChange={(e)=>setEmail(e.target.value)} className="rounded-3xl border-none bg-stone-300 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md" type="text" placeholder="Enter your E-mail" />
                            </div>

                            <div className="mb-4 text-lg">
                                <input onChange={(e)=>setPassword(e.target.value)} className="rounded-3xl border-none bg-stone-300 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md" type="Password"  placeholder='Enter your password' />
                            </div>
                            <div className="mt-8 flex justify-center text-lg text-black">
                                <button onClick={handleLogin} type="submit" className="rounded-3xl bg--400 bg-opacity-50 px-10 py-2 bg-cyan-400 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-yellow-600">Login</button>
                                {error && <h3 className='text-red-500 text-sm'>Something went wrong</h3>}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer/>

        </>
    )
}

export default Login