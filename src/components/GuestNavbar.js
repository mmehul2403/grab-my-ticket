import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
const GuestNavbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          <Button color="inherit" component={Link} to="/" style={{ color: "white" }}>
            GrabMyTicket
          </Button>
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/Movies">
          Movies
        </Button>

        <Button color="inherit" component={Link} to="/AboutUs">
          About Us
        </Button>
        <Button color="inherit" component={Link} to="/contact">
          Contact Us
        </Button>

        <Button color="inherit" component={Link} to="/SignIn">
          Sign In
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default GuestNavbar;
