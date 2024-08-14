import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import Category from './pages/Category';
import Cart from './pages/Cart';
import Pagenotfound from './pages/Pagenotfound';
import { AuthProvider } from './context/auth';

function App() {
  return (
    <AuthProvider>
      
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/category" element={<Category />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<Pagenotfound />} />
        </Routes>
      
    </AuthProvider>
  );
}

export default App;




