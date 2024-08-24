import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/auth';

const AdminRoute = ({children  }) => {
  const [auth] = useAuth();

  return auth?.user?.role === "1" ? children  : <Navigate to="/" />;
};

export default AdminRoute;










