import React from 'react'
import './App.css'
import Signup from './components/Signup'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import About from './components/About'
import Landing from './components/Landing'
import Dsa from './components/Dsa'
import MockDsa from './components/MockDsa'

import Dev from './components/dev/Dev'
import Frontend from './components/dev/Frontend'
import Backend from './components/dev/Backend'
import FullStack from './components/dev/FullStack'
import Database from './components/dev/Database'


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


          <Route path='/mock-dsa/:id' element={<ProtectedRoute>
            <MockDsa />
          </ProtectedRoute>} />

          <Route path='/dev' element={

            <ProtectedRoute>
              <Dev />
            </ProtectedRoute>
          } />

          <Route path='/dev/frontend' element={

            <ProtectedRoute>
              <Frontend />
            </ProtectedRoute>
          } />

          <Route path='/dev/backend' element={

            <ProtectedRoute>
              <Backend />
            </ProtectedRoute>
          } />

          <Route path='/dev/fullstack' element={

            <ProtectedRoute>
              <FullStack />
            </ProtectedRoute>
          } />

          <Route path='/dev/database' element={

            <ProtectedRoute>
              <Database />
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App;
