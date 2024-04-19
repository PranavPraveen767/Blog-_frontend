import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Comment from '../components/Comment';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL, IF } from '../Services/baseURL';
import { UserContext } from '../context/UserContext';
import Loader from '../components/Loader';
import { RiDeleteBin6Fill } from "react-icons/ri";

function PostDetails() {


  const navigate = useNavigate()

  const postId = useParams().id
  console.log(postId);


  const { user } = useContext(UserContext)


  const [comments, setComments] = useState([])

  const [comment, setComment] = useState("")


  const [post, setPost] = useState({})
  const [loader, setLoader] = useState(false)


  const fetchPost = async () => {
    setLoader(true)
    try {
      const res = await axios.get(BASE_URL + "/user/postdetails/" + postId)
      console.log(res.data);
      setPost(res.data)
      setLoader(false)

    } catch (err) {
      console.log(err);
      setLoader(true)

    }
  }

  const [admin, setadmin] = useState(false)

  useEffect(() => {
    if (JSON.parse(sessionStorage.getItem("existinguser"))._id == "65c7428d1fb4371f9f12e16c") {
      setadmin(true)
    }
  }, [])

  const handleDeletePost = async () => {
    try {
      const res = await axios.delete(BASE_URL + "/post/delete/" + postId, { withCredentials: true })
      console.log(res.data);
      navigate("/home")


    } catch (err) {
      console.log(err);

    }

  }
 

  useEffect(() => {
    fetchPost()

  }, [postId])


  const fetchPostComments = async () => {
    setLoader(true)
    try {
      const res = await axios.get(BASE_URL + "/comment/post/" + postId)
      setComments(res.data)
      setLoader(false)

    } catch (err) {
      setLoader(true)
      console.log(err);

    }
  }
  useEffect(() => {
    fetchPostComments()

  }, [postId])


  const postComment = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(BASE_URL + "/comment/create", { comment: comment, author: user.username, postId: postId, userId: user._id }, { withCredentials: true })

      fetchPostComments()
      setComments("")
      window.location.reload(true)

    } catch (err) {
      console.log(err);

    }
  }

  return (
    <>
      <Navbar />
      {loader ? <div className='h-[80vh]n flex justify-center items-center w-full'><Loader /></div> : <div className='px-8 md:px-[200px] mt-8 font-custom'>
        <div className='flex justify-between items-center'>
          <h1 className='text-2xl font-bold text-black md:text-3xl'>{post.title}</h1>
          
          {
            admin ?
              <button onClick={handleDeletePost}><RiDeleteBin6Fill size={25} /></button>
              :
              (user?._id === post?.userId &&
                <div className='flex items-center justify-center space-x-4'>
                  <button onClick={() => navigate("/edit/" + postId)}><FaRegEdit size={25} /></button>
                  <button onClick={handleDeletePost}><MdDelete size={25} /></button>
                </div>
              )
          }
            
        

        </div>
        <div className='flex items-center justify-between mt-2 md:mt-4'>
          <p>@{post.username}</p>
          <div className='flex space-x-2'>
            <p>{new Date(post.updatedAt).toString().slice(0, 15)}</p>
            <p>{new Date(post.updatedAt).toString().slice(16, 24)}</p>
          </div>
        </div>
        <img src={IF + post.photo} alt="noimg" className='w-full mx-auto mt-8' />
        <p className='mx-auto mt-8'>{post.description}</p>
        <div className='flex items-center  mt-8 space-x-4 font-semibold'>
          <p>Categories:</p>
          <div className='flex justify-center items-center space-x-2'>
            {post.categories?.map((c, i) => (
              <div key={i} className='bg-gray-300 rounded-lg px-3 py-1 '>{c}</div>


            ))}


          </div>
        </div>
        <div className='flex flex-col mt-4' >
          <h3 className='mt-6 mb-4 font-semibold'>Comments:</h3>
          {comments?.map((c) => (
            <Comment key={c._id} c={c} post={post} />
          ))
          }
        </div>

        <div className="w-full flex flex-col mt-4 md:flex-row">
          <input onChange={(e) => setComment(e.target.value)} type="text" placeholder="Write a comment" className="md:w-[80%] outline-none py-2 px-4 mt-4 md:mt-0" />
          <button onClick={postComment} className="bg-black text-sm text-white px-2 py-2 md:w-[20%] mt-4 md:mt-0">Add Comment</button>
        </div>


      </div>

      }


      <Footer />

    </>

  )
}

export default PostDetails