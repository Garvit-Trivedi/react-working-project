import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li><Link to="/">Meal</Link></li>
        <li><Link to="/cocktail">Cocktail</Link></li>
        <li><Link to="/harrypotter">Harry Potter</Link></li>
        <li><Link to="/bank">Bank</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
