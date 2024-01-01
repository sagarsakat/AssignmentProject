import React from 'react'
import {BrowserRouter, Routes , Route} from 'react-router-dom'
import Home from './home'
import Register from './register'
import Login from './login'
import TextColumn from './TextColumn'

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path='/' element={<Home />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/TextColumn' element={<TextColumn />}></Route> 
      
      </Routes>
    </BrowserRouter>
  )
}

export default App;
