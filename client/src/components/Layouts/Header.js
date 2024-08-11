import React from 'react'
import { NavLink,Link } from 'react-router-dom'
import { RiShoppingBag4Fill } from "react-icons/ri"


const Header = () => {
  return (
   <>
   <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <Link to="/"className="navbar-brand ms-auto" ><RiShoppingBag4Fill />UrbanCrate</Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon" />
  </button>
  <div className="collapse navbar-collapse" id="navbarNav">
    <ul className="navbar-nav me-auto">
      <li className="nav-item active ">
        <NavLink to="/"className="nav-link" >Home <span className="sr-only">(current)</span></NavLink>
      </li>
     <li className="nav-item">
        <NavLink to="/register"className="nav-link" >Register</NavLink>
      </li>
      
      <li className="nav-item">
        <NavLink to="/login"className="nav-link" >Login</NavLink>
      </li>
      <li className="nav-item">
        <NavLink to="/category"className="nav-link" >Category</NavLink>
      </li>
      <li className="nav-item">
        <NavLink to="/cart"className="nav-link" >Cart</NavLink>
      </li>
    </ul>
  </div>
</nav>

   </> 
  )
}

export default Header
