import React, { useContext, useEffect, useState } from 'react'
import HomePost from '../components/HomePost'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import axios from 'axios'
import { BASE_URL } from '../Services/baseURL'
import { Link, useLocation } from 'react-router-dom'
import Loader from '../components/Loader'
import { UserContext } from '../context/UserContext'

function Home() {

  const { search } = useLocation()
  console.log(search);

  const { user } = useContext(UserContext)
  console.log(user);



  const [loader, setLoader] = useState(false)


  const [posts, setPosts] = useState([])
  const [noResults, setNoResults] = useState(false)
  const fetchPosts = async () => {
    setLoader(true)
    try {

      const res = await axios.get(BASE_URL + "/get-allposts" + search)
      console.log(res.data);
      setPosts(res.data)
      if (res.data.length == 0) {
        setNoResults(true)
      }
      else {
        setNoResults(false)
      }
      setLoader(false)

    } catch (err) {
      console.log(err);

    }
  }

  useEffect(() => {
    fetchPosts()

  }, [search])

  return (
    <>
      <Navbar />
      <div className='px-8 md:px-[200px] min-h-[80vh] font-labrada'>
        {loader ? (<div className='h-[40vh] flex justify-center items-center'><Loader /></div>) : !noResults ? (posts.map((post) => (
          <Link key={post._id} to={user ? `/post/post/${post._id}` : "/login"}>
            <HomePost post={post} />
          </Link>
        ))) : (<h3 className='text-center font-bold mt-16'>No Posts Available</h3>)}
      </div>
      <Footer />
    </>
  )
}

export default Home