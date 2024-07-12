import React from "react";
import { Link } from "react-router-dom";
import "../styles/NavBar.css";
import {
  QUERY_USER_CURRENT,
  MUTATION_USER_SIGN_OUT,
} from "../queries/UserGraphql";
import { useQuery, useMutation } from "@apollo/client";
import { AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

/* const NavBar = () => {
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

 */
const NavBar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          <Button
            color="inherit"
            component={Link}
            to="/"
            style={{ color: "white" }}
          >
            GrabMyTicket
          </Button>
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/Movies">
          Movies
        </Button>
        <Button color="inherit" component={Link} to="/CreateMovie">
          Add Movie
        </Button>
        <Button color="inherit" component={Link} to="/AboutUs">
          About Us
        </Button>
        <Button color="inherit" component={Link} to="/contact">
          Contact Us
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
