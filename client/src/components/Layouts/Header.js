import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/auth';

const Header = () => {
  const [auth, setAuth] = useAuth()
  const handleLogout = () => {

  }
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <img src="/images/OIP.jpeg" alt="Logo" className="navbar-brand" style={{ height: '60px' }} />
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item active">
              <NavLink to="/" className="nav-link">Home <span className="sr-only">(current)</span></NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/category" className="nav-link">Category</NavLink>
            </li>
            {
              !auth.user ? (<> <li className="nav-item">
                <NavLink to="/register" className="nav-link">Register</NavLink>
              </li>
                <li className="nav-item">
                  <NavLink to="/login" className="nav-link">Login</NavLink>
                </li></>) : (<><li className="nav-item">
                  <NavLink onClick={handleLogout} to="/login" className="nav-link">Logout</NavLink>
                </li></>)
            }
            <li className="nav-item">
              <NavLink to="/cart" className="nav-link">Cart</NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Header;
