import React from 'react';
import Layout from './../components/Layouts/Layout';
import './Homepage.css'; 
import { useAuth } from "../context/auth";
import { NavLink } from "react-router-dom";

const Homepage = () => {
  
  const [auth,setAuth] = useAuth(); 

  return (
   <>
      <img className="homeimage" src="/images/dennis-siqueira-QnMeRW36-zY-unsplash.jpg" alt="homepage" />
      <pre>{JSON.stringify(auth, null, 4)}</pre>
      <NavLink to="/category" className="btn btn-primary">Shop Now</NavLink>
   </>
  );
};

export default Homepage;


