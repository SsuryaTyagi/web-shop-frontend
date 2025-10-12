import React from 'react'
import Navbar from './Components/Items/Navbar'
import { Route, Routes } from 'react-router'
import Home from './Components/Pages/Home/Home'
import List from './Components/pages/Menu/Menu'
import Cart from './Components/pages/Cart/Cart'

export default function App() {






  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/menu' element={<List/>}/>
      </Routes>
    </div>
  )
}
