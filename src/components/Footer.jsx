import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa6";


function Footer() {
  return (
    <>

      <footer className="bg-gradient-to-r from-gray-100 via-[#bce1ff] to-gray-100 font-merienda">
        <div className="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div>

              <h1 className='text-lg md:text-xl font-extrabold'>Blogify</h1>
              <p className="max-w-xs mt-4 text-sm text-gray-600 font-bold">
                Your Stories, Your Voice, Your Space.
              </p>
              <div className="flex mt-8 space-x-6 text-gray-600">
               
                <Link to="https://www.facebook.com/" className='hover:opacity-75' target='_blank'>  <FaFacebook size={25} />
</Link>
                

               
              
                <Link to="https://www.instagram.com/" className='hover:opacity-75' target='_blank'><FaInstagram size={25} /></Link>
                  


              
               
                <Link to="https://twitter.com/?lang=en" target='_blank'><FaTwitter size={25} /></Link>
                  

                
               
                  <Link to="https://github.com/" className='hover:opacity-75' target='_blank'>  <FaGithub size={25} /></Link>
                

                

              </div>
            </div>
            <div className="grid grid-cols-1 gap-8 lg:col-span-2 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <h1 className=" text-2xl">
                  Quick Links
                </h1>
                <nav className="flex flex-col mt-4 space-y-2 text-sm text-gray-500">
                  <Link to={'/'}  className="hover:opacity-75 " > Home </Link>
                  <Link to={'/login'}  className="hover:opacity-75 " > Login</Link>
                  <Link to={'/register'}  className="hover:opacity-75 " > Register </Link>
                  
                </nav>
              </div>
              <div>
                <h1 className="text-2xl">
                 Links
                </h1>
                <nav className="flex flex-col mt-4 space-y-2 text-sm text-gray-500">
                 
                  <h3><Link to="https://react.dev/" target='_blank'><p className='text-lg'>React</p></Link></h3>
                  <h1><Link to="https://tailwindcss.com/"><p className='text-lg'>Tailwind</p></Link></h1>
                  <Link to='https://www.mongodb.com/'><p className='text-lg'>MongoDB</p></Link>

                </nav>
              </div>
              <div>
                <p className="font-medium">
                  Helpful Links
                </p>
                <nav className="flex flex-col mt-4 space-y-2 text-sm text-gray-500">
                  <Link className="hover:opacity-75" > Contact </Link>
                  <Link className="hover:opacity-75" > FAQs </Link>
                  <Link className="hover:opacity-75" > Live Chat </Link>
                </nav>
              </div>
              <div>
                <p className="font-medium">
                  Legal
                </p>
                <nav className="flex flex-col mt-4 space-y-2 text-sm text-gray-500">
                  <Link  className="hover:opacity-75" > Privacy Policy </Link>
                  <Link className="hover:opacity-75" > Terms &amp; Conditions </Link>
                  <Link className="hover:opacity-75" > Returns Policy </Link>
                  <Link className="hover:opacity-75" > Accessibility </Link>
                </nav>
              </div>
            </div>
          </div>
          <p className='py-2 pb-2 pt-6 text-center  text-sm'>All rights reserved @blogify 2023</p>
        </div>
      </footer>
    </>
  )
}

export default Footer