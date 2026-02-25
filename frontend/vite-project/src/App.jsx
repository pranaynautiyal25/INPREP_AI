import React from 'react'
import './App.css'
import Signin from './components/Signin'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import About from './components/About'
import Landing from './components/Landing'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/login' element={<Login />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/about' element={<About />} />
        </Routes>
      </Router>

    </div>
  )
}

export default App
