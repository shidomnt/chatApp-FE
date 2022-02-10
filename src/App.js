import React from 'react';
import { Empty } from 'antd';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import 'antd/dist/antd.css';

import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import { UserProvider } from './contexts';
import ChatRoom from './components/ChatRoom';
import ChatWindow from './components/ChatRoom/ChatWindow';

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/rooms" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/rooms" element={<ChatRoom />}>
            <Route index element={<Empty />} />
            <Route path="/rooms/:roomId" element={<ChatWindow />} />
          </Route>
          <Route path="*" element={<div>404 not found!</div>} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
