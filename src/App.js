import React from "react";
import AboutUs from "./components/AboutUs";
import Home from "./components/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Movie from "./components/Movie";

import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import SignOut from "./components/SignOut";
import UserProfile from "./components/UserProfile";

import CreateMovie from "./components/Admin/CreateMovie";
import ContactUs from "./components/ContactUs";
import Footer from "./components/Footer";

function App() {
  return (
    <React.StrictMode>
      <Router>
        <NavBar />
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/AboutUs" element={<AboutUs />}></Route>
            <Route path="/Movies" element={<Movie />}></Route>

            <Route path="/SignIn" element={<SignIn />}></Route>
            <Route path="/SignUp" element={<SignUp />}></Route>
            <Route path="/SignOut" element={<SignOut />}></Route>
            <Route path="/UserProfile" element={<UserProfile />}></Route>
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/CreateMovie" element={<CreateMovie />}></Route>
          </Routes>
        </div>
      </Router>
    </React.StrictMode>
  );
}

export default App;
