// src/components/NavBar.js
import React from "react";
import { Link } from "react-router-dom";
import "../styles/NavBar.css";

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">GrabMyTicket</Link>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/Movies">Movies</Link>
        </li>
        <li>
          <Link to="/AboutUs">About Us</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
