import React, { useState } from 'react';
import Layout from '../../components/Layouts/Layout';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './authstyle.css'; 
import { useAuth } from "../../context/auth";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Destructure auth and setAuth from useAuth
    const [ auth, setAuth ] = useAuth();
    
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/auth/login', { email, password });
            
            // Log the entire response to check the structure
            console.log("API Response:", res.data);

            if (res && res.data.success) {
                toast.success(res.data.message);
                
                // Update auth context with user and token
                setAuth({
                  ...auth,
                    user: res.data.user,
                    token: res.data.token,
                });

                // Store the auth data in localStorage
                localStorage.setItem('auth', JSON.stringify(res.data));
                
                // Log to verify navigate will be called
                console.log("Navigating to home page...");
                
                // Navigate to home page
                navigate('/');
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.error("Login Error:", error);
            toast.error('Something went wrong');
        }
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
                                aria-describedby="emailHelp" 
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
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </Layout>
        </div>
    );
};

export default Login;
