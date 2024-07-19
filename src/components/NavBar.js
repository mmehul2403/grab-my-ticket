import React from "react";
import { Link } from "react-router-dom";
import "../styles/NavBar.css";
import { QUERY_USER_CURRENT } from "../queries/UserGraphql";
import { useQuery } from "@apollo/client";
import { AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useMutation } from "@apollo/client";

import { useNavigate } from "react-router-dom";

import { MUTATION_USER_SIGN_OUT } from "../queries/UserGraphql";
import { useAuth } from "./auth/AuthProvider";
const NavBar = () => {
  const { setAuth, user } = useAuth();
  const { data, loading } = useQuery(QUERY_USER_CURRENT);
  const [signOut] = useMutation(MUTATION_USER_SIGN_OUT);
  const navigate = useNavigate();

  const logout = async () => {
    const resp = await signOut();

    if (resp.data.signOut.code === 0) {
      setAuth(false);
      //navigate to signIn
      navigate({
        pathname: "/SignIn",
      });
    }
  };

  if (loading) return <p>Loading...</p>;

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
        <Button color="inherit" component={Link} to="/CreateMovie">
          Add Movie
        </Button>
        <Button color="inherit" component={Link} to="/CinemaTable">
          Cinemas
        </Button>
        <Button color="inherit" component={Link} to="/AboutUs">
          About Us
        </Button>
        <Button color="inherit" component={Link} to="/contact">
          Contact Us
        </Button>
        <Button color="inherit" component={Link} to="/UserList">
          Users
        </Button>
        {/* {data?.currentUser ? ( */}
        <Button color="inherit" onClick={logout}>
          Sign Out
        </Button>
        {/* ) : (
          <Button color="inherit" component={Link} to="/SignIn">
            Sign In
          </Button>
        )} */}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
