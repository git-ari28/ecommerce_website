import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layouts/Layout';
import UserMenu from '../../components/Layouts/UserMenu';
import { useAuth } from '../../context/auth';
import axios from 'axios';

const Profile = () => {
  const { auth, setAuth } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');

  // Populate fields with the current user data
  useEffect(() => {
    if (auth?.user) {
      setName(auth.user.name);
      setEmail(auth.user.email);
      setAddress(auth.user.address);
      setPhone(auth.user.phone);
    }
  }, [auth?.user]);

  // Handle form submission to update profile
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        '/api/auth/profile',
        {
          name,
          email,
          password,
          address,
          phone,
        },
        {
          headers: {
            Authorization: auth?.token, // Include the token in the headers
          },
        }
      );

      if (data?.success) {
        setAuth({ ...auth, user: data.updatedUser });
        alert('Profile updated successfully');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error updating profile:', error.response?.data || error.message);
      alert('An error occurred while updating the profile.');
    }
  };

  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
              <h2>Your Profile</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <label>Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Phone</label>
                  <input
                    type="text"
                    className="form-control"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Address</label>
                  <input
                    type="text"
                    className="form-control"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-primary">Update Profile</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;


