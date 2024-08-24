import React, { useState } from 'react';
import Layout from '../../components/Layouts/Layout';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import './authstyle.css'; 
import { useAuth } from "../../context/auth";
import { useLocation, useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8080/api/auth/login', { email, password });
            
            if (res && res.data.success) {
                toast.success(res.data.message);
                
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token,
                });

                localStorage.setItem('auth', JSON.stringify(res.data));
                
                // Debugging statement to check role
                console.log("User Role:", res.data.user.role);

                // Redirect based on user role
                if (res.data.user.role === "1") { // Admin role
                    navigate('/dashboard/admin');
                } else { // Regular user role
                    navigate('/dashboard/user');
                }
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            toast.error('Something went wrong');
        }
    };

    const handleForgotPassword = () => {
        navigate("/forgot-password");
    };

    const handleLogout = () => {
        setAuth({
            user: null,
            token: null,
        });
        localStorage.removeItem('auth');
        navigate('/login');
    };

    return (
        <div className="page-wrapper">
            <Layout>
                <Toaster />
                <div className="registration">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input 
                                type="email" 
                                className="form-control" 
                                id="email" 
                                placeholder="Enter email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                required 
                            />
                        </div>
                        <div className="form-group">
                            <input 
                                type="password" 
                                className="form-control" 
                                id="password" 
                                placeholder="Enter password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                required 
                            />
                        </div>
                        <button 
                            type="button" 
                            className="btn btn-secondary" 
                            onClick={handleForgotPassword}
                        >
                            Forgot Password
                        </button>
                        <button 
                            type="submit" 
                            className="btn btn-primary"
                        >
                            Login
                        </button>
                    </form>
                    {auth.user && (
                        <button 
                            onClick={handleLogout} 
                            className="btn btn-secondary mt-3"
                        >
                            Logout
                        </button>
                    )}
                </div>
            </Layout>
        </div>
    );
};

export default Login;






