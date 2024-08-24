// src/pages/user/UserDashboard.js

import React from 'react';
import { Outlet } from 'react-router-dom'; // To render nested routes
import Layout from '../../components/Layouts/Layout';
import UserMenu from '../../components/Layouts/UserMenu';
import { useAuth } from '../../context/auth';

export const Dashboard = () => {
  const [auth] = useAuth();

  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
              <h1>Welcome, {auth?.user?.name}</h1>
              <Outlet /> {/* Renders nested routes here */}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;


