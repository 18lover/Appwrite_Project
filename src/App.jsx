import { useState } from 'react'
import { BrowserRouter , Route, Routes } from 'react-router-dom'
import Signup from './Components/Signup'
import Login from './Components/Login'
import './App.css'
import Profile from './Components/Profile'

function App() {

  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/profile' element={<Profile/>}/>

        </Routes>
    </BrowserRouter>
  )
}

export default App
