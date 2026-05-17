import React from 'react'
import { Routes, Route } from 'react-router'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Menu from './pages/Menu'

function App() {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/mainhome' element={<Menu />} />
        </Routes>
    )
}

export default App