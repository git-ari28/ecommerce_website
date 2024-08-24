import React from 'react';
import Layout from './../components/Layouts/Layout';
import Products from './Products';  // Import the Products component
import { useAuth } from "../context/auth";
import { NavLink } from "react-router-dom";

const Homepage = () => {
  const [auth, setAuth] = useAuth(); 

  return (
    <Layout>
     
      <Products />  {/* Include the Products component */}
    </Layout>
  );
};

export default Homepage;





