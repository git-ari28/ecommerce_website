

import React from 'react';
import { NavLink } from 'react-router-dom';

const UserMenu = () => {
  return (
    <div className="list-group">
      <NavLink to="/dashboard/user" className="list-group-item list-group-item-action">
        Dashboard
      </NavLink>
      <NavLink to="/orders" className="list-group-item list-group-item-action">
        Orders
      </NavLink>
      <NavLink to="/profile" className="list-group-item list-group-item-action">
        Profile
      </NavLink>
    </div>
  );
};

export default UserMenu;
