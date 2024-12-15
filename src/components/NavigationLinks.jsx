import React from 'react';
import { Link } from 'react-router-dom';
import './NavigationLinks.css'; // External styles for this component

const NavigationLinks = () => {
  return (
    <nav className="nav-links">
      <ul className="nav-item-container">
        <li><Link className="nav-link" to="/meals">Meals</Link></li>
        <li><Link className="nav-link" to="/cocktails">Cocktails</Link></li>
        <li><Link className="nav-link" to="/potter">Potter</Link></li>
        <li><Link className="nav-link" to="/banks">Banks</Link></li>
      </ul>
    </nav>
  );
};

export default NavigationLinks;
