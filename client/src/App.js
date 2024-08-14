import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from "./components/Layouts/Layout";
import Homepage from "./pages/Homepage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import Pagenotfound from "./pages/Pagenotfound";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import RecommendationsPage from "./pages/RecommendationsPage";  // Import your RecommendationsPage component
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SearchBar from "./pages/SearchBar.js" // Import the SearchBar component

function App() {
  return (
    <>
      <Layout>
        <SearchBar /> {/* Add SearchBar here */}
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/policy" element={<Policy />} />
          <Route path="/search" element={<RecommendationsPage />} /> {/* Update this route */}
          <Route path="*" element={<Pagenotfound />} />
        </Routes>
      </Layout>
      <ToastContainer />
    </>
  );
}

export default App;


