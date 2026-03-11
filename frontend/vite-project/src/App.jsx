import React from 'react'
import './App.css'
import Signup from './components/Signup'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import About from './components/About'
import Landing from './components/Landing'
import Dsa from './components/Dsa'
import Dev from './components/Dev'
import MockDsa from './components/MockDsa'


import { AuthProvider } from './Context/AuthContext'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'

function App() {

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/dashboard' element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path='/about' element={<About />} />
          <Route path='/dsa-mock' element={<ProtectedRoute>
            <Dsa />
          </ProtectedRoute>} />
          <Route path='/dev-mock' element={<ProtectedRoute>
            <Dev />
          </ProtectedRoute>} />

          <Route path='/mock-dsa/:id' element={<ProtectedRoute>
            <MockDsa />
          </ProtectedRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App;
