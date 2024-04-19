import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { BASE_URL } from '../Services/baseURL';
import { UserContext } from '../context/UserContext';
import { RiDeleteBin6Fill } from "react-icons/ri";
import Swal from 'sweetalert2'

/* import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react' */


function Comment({c,post}) {
    const {user}=useContext(UserContext)
   /*  const [open, setOpen] = useState(false)
   const[newcomment,setNewComment]=useState("")
   const[isEditting,setIsEditting]=useState({
    comment:"",
    author:"",
    postId:"",
    userId:""
   })
   
   console.log(newcomment); */

  /*   const cancelButtonRef = useRef(null) */

    const deletComment=async(id)=>{
        try {
            await axios.delete(BASE_URL +"/comment/"+id,{withCredentials:true})
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Your Comment  has been deleted!",
                showConfirmButton: false,
                timer: 3000
            });
            window.location.reload(true)
          
            
        } catch (err) {
           console.log(err);
            
        }
    }
    console.log("User ID:", user?._id);
    console.log("Comment User ID:", c?._Id); 
    console.log(c.userId);  
    const [admin, setadmin] = useState(false)

    useEffect(() => {
        if (JSON.parse(sessionStorage.getItem("existinguser"))._id == "65c7428d1fb4371f9f12e16c") {
            setadmin(true)
        }
    }, [])

/*     useEffect(()=>{
       setNewComment() comment:c.comment
    }) */
    
  return (
  <>
          <div className='px-2 py-2 bg-gray-200 rounded-lg my-2 font-custom'>
              <div className='flex items-center justify-between'>
                  <h3 className='font-bold text-gray-600'>@{c.author}</h3>
                  <div className='flex justify-center items-center space-x-4'>
                      <p>{new Date(c.updatedAt).toString().slice(0, 15)}</p>
                      <p>{new Date(c.updatedAt).toString().slice(16, 24)}</p>
                      {user?._id===c?.userId?(
                              <div className='flex items-center justify-center space-x-4'>
                                  <button onClick={()=>setOpen(true)} ><FaRegEdit size={25} /></button>
                                  <button onClick={()=>deletComment(c._id)}><MdDelete size={25} /></button>
                              </div>):""
                      }
                      {
                          admin && <button onClick={()=>
                            deletComment(c._id)}><RiDeleteBin6Fill size={25} /></button>
                      }
                     

                  </div>
              </div>
              <p className='px-4 mt-2'>{c.comment}</p>
              
          </div>
          {/* <Transition.Root show={open} as={Fragment}>
              <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
                  <Transition.Child
                      as={Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                  >
                      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                  </Transition.Child>

                  <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                          <Transition.Child
                              as={Fragment}
                              enter="ease-out duration-300"
                              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                              enterTo="opacity-100 translate-y-0 sm:scale-100"
                              leave="ease-in duration-200"
                              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                          >
                              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                      <div className="sm:flex sm:items-start">
                                         
                                          <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                              <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                                Edit Your Comment
                                              </Dialog.Title>
                                              <div className="mt-2">
                                                  <p className="text-sm text-gray-500">
                                                      <textarea onChange={(e)=>setNewComment(e.target.value)} style={{width:'100%'}} rows={30} cols={30} className='px-4 py-2 outline-none' type="text"  />
                                                  </p>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                      <button
                                          type="button"
                                          className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                          onClick={() => setOpen(false)}
                                      >
                                          Deactivate
                                      </button>
                                      <button
                                          type="button"
                                          className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                          onClick={() => setOpen(false)}
                                          ref={cancelButtonRef}
                                      >
                                          Cancel
                                      </button>
                                  </div>
                              </Dialog.Panel>
                          </Transition.Child>
                      </div>
                  </div>
              </Dialog>
          </Transition.Root> */}
  </>
  )
}

export default Comment