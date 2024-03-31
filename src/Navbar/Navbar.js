import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <h1>Healthwrap</h1>
      <ul className="nav-links">
      <li>
          <Link to="/Home">Home</Link>
        </li>
        <li>
          <Link to="/Products">Products</Link>
        </li>
        <li>
          <Link to="/Recipes">Recipes</Link>
        </li>
        <li>
          <Link to="/Workout">Workout</Link>
        </li>
        <li>
          <Link to="/Tracker">Tracker</Link>
        </li>
        <li>
          <Link to="/Chat">Support</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
