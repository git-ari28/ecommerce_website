import React, { useState } from 'react';
import Layout from '../../components/Layouts/Layout';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import './authstyle.css'; 
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [answer, setAnswer] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8080/api/auth/forgot-password', { email, newPassword, answer });
            
            if (res && res.data.success) {
                toast.success(res.data.message);
                navigate("/login"); // Redirect to login page after successful reset
            } else {
                toast.error(res.data.message || 'Failed to reset password');
            }
        } catch (error) {
            console.error('Error resetting password:', error);
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
                                placeholder="Enter email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                required 
                            />
                        </div>
                        <div className="form-group">
                            <input 
                                type="text" // Changed type to text to match the input
                                className="form-control" 
                                id="answer" // Changed id to avoid duplicate IDs
                                placeholder="What is your favourite sport?" 
                                value={answer} 
                                onChange={(e) => setAnswer(e.target.value)} 
                                required 
                            />
                        </div>
                        <div className="form-group">
                            <input 
                                type="password" 
                                className="form-control" 
                                id="newPassword" // Changed id to avoid duplicate IDs
                                placeholder="Enter new password" 
                                value={newPassword} 
                                onChange={(e) => setNewPassword(e.target.value)} 
                                required 
                            />
                        </div>
                        <div className='mb-3'>
                            <button type="submit" className="btn btn-primary">Reset Password</button>
                        </div>
                    </form>
                </div>
            </Layout>
        </div>
    );
};

export default ForgotPassword;

