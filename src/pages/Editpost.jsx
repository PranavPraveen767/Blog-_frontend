import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { ImCross } from "react-icons/im";
import axios from 'axios';
import { BASE_URL } from '../Services/baseURL';
import { useParams } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import background from '../image/background.png'

function Editpost() {

    const postId = useParams().id

    const user = useContext(UserContext)


    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [file, setFile] = useState(null)

    const [cat, setCat] = useState("")
    const [cats, setCats] = useState([])


    const fetchpost = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/postdetails/" + postId)
            setTitle(res.data.title)
            setDescription(res.data.description)
            setFile(res.data.photo)
            setCats(res.data.categories)

        } catch (err) {
            console.log(err);

        }
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        const post = {
            title,
            description,
            username: user.username,
            userId: user._id,
            categories: cats
        }

        if (file) {
            const data = new FormData()
            const filename = Date.now() + file.name
            data.append("img", filename)
            data.append("file", file)
            post.photo = filename
            console.log(data);

            try {
                const imageupload = await axios.post(BASE_URL + "/upload", data)

                console.log(imageupload.data);

            }
            catch (err) {
                console.log(err);
            }
        }

        //post upload
        console.log(post);
        try {
            const res = await axios.put(BASE_URL + "/post/update/" + postId, post, { withCredentials: true })
            navigate("/user/postdetails/" + res.data._id)
            console.log(res.data);

        } catch (err) {
            console.log(err);

        }

    }
    useEffect(() => {
        fetchpost()

    }, [postId])


    const deleteCategory = (i) => {
        let updatedCats = [...cats]
        updatedCats.splice(i, 1)
        setCats(updatedCats)
    }

    const addcategory = () => {
        let updatedCats = [...cats]
        updatedCats.push(cat)
        setCat("")
        setCats(updatedCats)
    }
    useEffect(() => {
        addcategory()

    }, [])
    console.log(cat);

    return (
        <>
            <Navbar />
            <div className='px-6 md:px-[200px] mt-8 font-custom rounded-xl bg-cover bg-no-repeat bg-slate-950 min-h-[90vh] ' style={{ backgroundImage: `url("https://w.wallhaven.cc/full/kx/wallhaven-kxj3l1.jpg")` }} >
                <h1 className='font-bold md:text-2xl text-xl mt-8 text-white text-center'>Edit  Post</h1>
                <form className='w-full flex flex-col space-y-4 md:space-y-8 mt-4'>
                    <input onChange={(e) => setTitle(e.target.value)} value={title} type="text" className='px-4 py-2 outline-none rounded-3xl border-none bg-stone-300 bg-opacity-50  text-center text-inherit placeholder-slate-200 shadow-lg  backdrop-blur-md' placeholder='Enter Post Title' />
                    <input onChange={(e) => setFile(e.target.files[0])} type="file" className='px-4' />
                    <div className='flex flex-col'>
                        <div className='flex items-center space-x-4 md:space-x-8'>
                            <input value={cat} onChange={(e) => setCat(e.target.value)} type="text" className='px-4 py-2 outline-none rounded-3xl border-none bg-stone-300 bg-opacity-50  text-center text-inherit placeholder-slate-200 shadow-lg  backdrop-blur-md' placeholder='ENter Post Category' />
                            <div onClick={addcategory} className='bg-black text-white px-4 py-2 font-semibold cursor-pointer rounded-xl'>Add</div>
                        </div>
                        {/* categories */}
                        <div className='flex px-4 mt-3'>
                            {
                                cats?.map((c, i) => (
                                    <div key={i} className='flex justify-center item-center space-x-2 mr-4 bg-gray-200 px-2 py-1 rounded-md'>
                                        <p>{c}</p>
                                        <p onClick={() => deleteCategory(i)} className='text-white bg-black rounded-full cursor-pointer p-1 text-sm'><ImCross /></p>
                                    </div>

                                ))
                            }


                        </div>



                    </div>
                    <textarea onChange={(e) => setDescription(e.target.value)} value={description} rows={15} cols={30} className='px-4 py-2 outline-none rounded-3xl border-none bg-stone-300 bg-opacity-50  text-center text-inherit placeholder-slate-200 shadow-lg  backdrop-blur-md' placeholder='Enter post Description'></textarea>
                    <button onClick={handleUpdate} className='bg-black w-full md:w-[20%] mx-auto text-white font-semibold px-4 py-2 md:text-lg'>Update</button>
                </form>
            </div>
            <Footer />
        </>
    )
}

export default Editpost