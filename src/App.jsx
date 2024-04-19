import React from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import PostDetails from './pages/PostDetails'
import CreatePost from './pages/CreatePost'
import Editpost from './pages/Editpost'
import Profile from './pages/Profile'
import Landing from './pages/Landing'
import { UserContextProvider } from './context/UserContext'
import Myblogs from './pages/Myblogs'

function App() {
  return (
    <>
   <UserContextProvider>
        <Routes>
          <Route exact path='/' element={<Landing />} />
          <Route exact path='/home' element={<Home />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/register' element={<Register />} />
          <Route exact path='/post/post/:id' element={<PostDetails />} />
          <Route exact path='/write' element={<CreatePost />} />
          <Route exact path='/edit/:id' element={<Editpost />} />
          <Route exact path='/profile/:id' element={<Profile />} />
          <Route exact path='/myblogs/:id' element={<Myblogs />} />

        </Routes>

   </UserContextProvider>
   
    
    </>
  )
}

export default App