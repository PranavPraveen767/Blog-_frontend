import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProfilePosts from "../components/ProfilePosts";
import axios from "axios";
import { BASE_URL } from "../Services/baseURL";
import { UserContext } from "../context/UserContext";
import { useNavigate, useParams } from "react-router-dom";

function Profile() {
    const param=useParams().id
    const [username,setUserName]=useState("")
    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")
    const{user,setUser}=useContext(UserContext)
    console.log(user);
    const navigate=useNavigate()
    const[updated,setUpdated]=useState(false)
    const [posts,setPosts]=useState([])


    const fetchprofile=async()=>{
        try {
            const res=await axios.get(BASE_URL+"/user/"+user._id)
            setUserName(res.data.username)
            setEmail(res.data.email)
            setPassword(res.data.password)
            
        } catch (err) {
            console.log(err);
            
        }
    }

    const handleUserUpdate=async()=>{
        setUpdated(false)
        try {
            const res=await axios.put(BASE_URL+"/user/"+user._id,{username,email,password},{withCredentials:true})
            console.log(res.data);
            setUpdated(true)
            
        } catch (err) {
            console.log(err)
            setUpdated(false)
            
        }
        
    }

    const handleUserDelete=async()=>{
        try {
            const res = await axios.delete(BASE_URL + "/user/"+user._id, { withCredentials: true })
            setUser(null)
            console.log(res.data);
            navigate('/home')
            

        } catch (err) {
            console.log(err)

        }

    }


    const fetUserPosts=async()=>{
        try {
            const res = await axios.get(BASE_URL +"/user/posts/"+user._id)
            setPosts(res.data)
            console.log(res.data);
            
        } catch (err) {
            console.log(err);
            
        }
    }
    useEffect(()=>{
        fetchprofile()

    },[param])
    useEffect(()=>{
        fetUserPosts()

    },[param])
    return (
        <>
            <Navbar />
            <div className="px-8 md:px-[200px] mt-8 flex md:flex-row flex-col-reverse md:items-start font-custom">
                <div className="flex flex-col md:w-[70%] w-full">
                    <h1 className="text-xl font-bold mb-4">Your Posts</h1>
                    {posts?.map((p)=>(
                        <ProfilePosts key={p._id} p={p}/>
                    ))}
                </div>
                <div className=" md:sticky md:top-16 flex justify-start md:justify-end items-start md:w-[30%] w-full md:items-end">
                    <div className="flex flex-col space-y-4 items-start">
                        <h1 className="text-xl font-bold mb-4" >
                            Profile
                        </h1>
                        <input onChange={(e)=>setUserName(e.target.value)} value={username} type="text" placeholder="Your username" className="outline-none px-4 py-2 text-gray-500" />
                        <input onChange={(e)=>setEmail(e.target.value)} value={email} type="text" placeholder="Your E-mail" className="outline-none px-4 py-2 text-gray-500" />
                       {/*  <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" placeholder="Your password" className="outline-none px-4 py-2 text-gray-500" /> */}
                        <div className="flex items-center space-x-4 mt-8">
                            <button  onClick={handleUserUpdate}  className="text-white font-semibold bg-black px-4 py-2 hover:text-text-black hover:bg-gray-400 rounded-xl">Update</button>
                            <button  onClick={handleUserDelete}  className="text-white font-semibold bg-black px-4 py-2 hover:text-text-black hover:bg-gray-400 rounded-xl">Delete</button>
                        </div>
                        {updated && <h3 className="text-green-500 text-sm text-center mt-4">User Updated Successfully</h3>}

                    </div>
                   
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Profile;
