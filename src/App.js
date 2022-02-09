import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import "./App.css";
import 'antd/dist/antd.css';

import Login from './components/Auth/Login';
import Register from './components/Auth/Register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>MEssage</div>} />
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="*" element={<div>404 not found!</div>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
