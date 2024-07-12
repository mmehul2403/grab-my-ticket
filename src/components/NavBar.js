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

const NavBar = () => {
  const { data, loading } = useQuery(QUERY_USER_CURRENT);

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
        {data?.currentUser ? (
          <Button color="inherit" component={Link} to="/SignOut">
            Sign Out
          </Button>
        ) : (
          <Button color="inherit" component={Link} to="/SignIn">
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
