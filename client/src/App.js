import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import Category from './pages/Category';
import Cart from './pages/Cart';
import Pagenotfound from './pages/Pagenotfound';
import Dashboard from './pages/user/Dashboard';
import PrivateRoute from './components/Routes/Private'; 
import ForgotPassword from './pages/Auth/ForgotPassword';
import AdminRoute from './components/Routes/AdminRoute';
import AdminDashboard from './pages/Admin/AdminDashboard';
import CreateCategory from './pages/Admin/CreateCategory';
import CreateProduct from './pages/Admin/CreateProduct';
import Users from './pages/Admin/Users';
import Orders from './pages/user/Orders';
import Profile from './pages/user/Profile';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import { useCart } from './context/CartContext'; // Import the useCart hook

function App() {
  const { cart, addToCart } = useCart(); // Use CartContext

  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/products" element={<Products addToCart={addToCart} />} />
      <Route path="/cart" element={<Cart cart={cart} />} />
      
      <Route path="/dashboard/user" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      <Route path="/orders" element={<PrivateRoute><Orders /></PrivateRoute>} />
      <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
      <Route path="/dashboard/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
      <Route path="/dashboard/admin/create-category" element={<AdminRoute><CreateCategory /></AdminRoute>} />
      <Route path="/dashboard/admin/create-product" element={<AdminRoute><CreateProduct /></AdminRoute>} />
      <Route path="/dashboard/admin/users" element={<AdminRoute><Users /></AdminRoute>} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Pagenotfound />} />
    </Routes>
  );
}

export default App;












