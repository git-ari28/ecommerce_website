import React from 'react';
import Layout from './../components/Layouts/Layout';
import './Homepage.css'; 
import { useAuth } from "../context/auth";

const Homepage = () => {
  
  const [auth,setAuth] = useAuth(); 

  return (
    <Layout>
      <img className="homeimage" src="/images/dennis-siqueira-QnMeRW36-zY-unsplash.jpg" alt="homepage" />
      <pre>{JSON.stringify(auth, null, 4)}</pre>
    </Layout>
  );
};

export default Homepage;

