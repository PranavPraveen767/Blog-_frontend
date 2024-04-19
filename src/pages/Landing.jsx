import React from 'react'

import Footer from '../components/Footer'
import { Link } from 'react-router-dom'
import hero from '../image/hero.png'

function Landing() {
    return (
        <>
            <div className='flex items-center justify-between px-6 md:px-[200px] py-4  text-black font-custom'  >
                <h1 className=' text-lg md:text-xl font-extrabold'><Link to='/'>Blogify</Link></h1>


            </div>

            <div className="container my-5 mx-auto md:px-6 font-labrada">

                <section className="mb-32 text-center lg:text-left">
                    <div className="px-6 py-5 md:px-12">
                        <div className="grid items-center lg:grid-cols-2 lg:gap-x-12">
                            <div className="mb-12 lg:mb-0">
                                <h2 className="my-5 text-4xl font-bold leading-tight tracking-tight font-boogaloo">
                                    Explore Insightful Blogs <br />

                                </h2>
                                <p className='mt-4 text-justify font-custom font-medium'>Welcome to Blogify, where knowledge meets inspiration! Immerse yourself in a diverse collection of captivating blogs that cover a spectrum of topics. From technology trends and lifestyle hacks to thought-provoking essays and travel adventures, our platform is your gateway to a world of insights and ideas. Join our community of avid readers and passionate writers as we embark on a journey of discovery and enlightenment. Unleash your curiosity, expand your horizons, and enjoy the rich tapestry of perspectives that await you at Blogify. Start exploring today!</p>
                                <button className='bg-rose-400 w-75 px-2 py-2 rounded-lg hover:bg-rose-700 mt-6 font-custom'><h3 className='font-bold'><Link to='/home' >Let's Begin</Link></h3></button>
                            </div>

                            <div className="mb-12 lg:mb-0">
                                <img src={hero}
                                    className="w-full rounded-lg shadow-lg dark:shadow-black/20" alt="" />
                            </div>
                        </div>
                    </div>
                </section>

            </div>




            <Footer />
        </>
    )
}

export default Landing