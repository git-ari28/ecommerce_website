import React from 'react';
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className='bg-dark test-light p-3'>
      <h6 className='text-center text-light'>All rights reserved &copy;UrbanCrate</h6>
      <div className="text-center mt-3">
        <ul className="list-unstyled">
          <li className="d-inline mx-2">
            <Link to="/about" className="text-light">About</Link>
          </li>
          <li className="d-inline mx-2">
            <Link to="/contact" className="text-light">Contact</Link>
          </li>
          <li className="d-inline mx-2">
            <Link to="/policy" className="text-light">Privacy Policy</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Footer;




