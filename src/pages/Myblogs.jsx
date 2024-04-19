import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { UserContext } from '../context/UserContext'
import axios from 'axios'
import Loader from '../components/Loader'
import { Link, useLocation } from 'react-router-dom'
import { BASE_URL } from '../Services/baseURL'
import HomePost from '../components/HomePost'

function Myblogs() {
 
        const { search } = useLocation()
        // console.log(search)
        const [posts, setPosts] = useState([])
        const [noResults, setNoResults] = useState(false)
        const [loader, setLoader] = useState(false)
        const { user } = useContext(UserContext)
        // console.log(user)

        const fetchPosts = async () => {
            setLoader(true)
            try {
                const res = await axios.get(BASE_URL+"/user/posts/"+user._id)
                // console.log(res.data)
                setPosts(res.data)
                if (res.data.length === 0) {
                    setNoResults(true)
                }
                else {
                    setNoResults(false)
                }
                setLoader(false)

            }
            catch (err) {
                console.log(err)
                setLoader(true)
            }
        }

        useEffect(() => {
            fetchPosts()

        }, [search])
  return (
    <>
    <Navbar/>
          <div>
             
              <div className="px-8 md:px-[200px] min-h-[90vh]">
                  {loader ? <div className="h-[40vh] flex justify-center items-center"><Loader /></div> : !noResults ?
                      posts.map((post) => (
                          <>
                              <Link to={user ? `/user/postdetails/${post._id}` : "/login"}>
                                  <HomePost key={post._id} post={post} />
                              </Link>
                          </>

                      )) : <h3 className="text-center font-bold mt-16">No posts available</h3>}
              </div>
              <Footer />
          </div>
    <Footer/>
    </>
  )
}

export default Myblogs