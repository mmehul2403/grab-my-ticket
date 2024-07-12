// src/components/NavBar.js
import React from "react";
import { Link } from "react-router-dom";
import "../styles/NavBar.css";
import { QUERY_USER_CURRENT, MUTATION_USER_SIGN_OUT } from "../queries/UserGraphql";
import { useQuery, useMutation } from "@apollo/client";

const NavBar = () => {
  const { data, loading } = useQuery(QUERY_USER_CURRENT);

  if (loading) return <p>Loading...</p>;
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
          <Link to="/CreateMovie">Add Movie</Link>
        </li>
        <li>
          <Link to="/CinemaTable">Cinema</Link>
        </li>
        <li>
          <Link to="/AboutUs">About Us</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
        {data?.currentUser ? (
          <li>
            <Link to="/SignOut">Sign Out</Link>
          </li>
        ) : (
          <li>
            <Link to="/SignIn">Sign In</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
