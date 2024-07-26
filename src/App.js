import React from "react";
import AboutUs from "./components/AboutUs";
import Home from "./components/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Movie from "./components/Movie";

import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
// import SignOut from "./components/SignOut";
import UserProfile from "./components/UserProfile";

import CreateMovie from "./components/Admin/CreateMovie";
import CinemaTable from "./components/Admin/cinema/CinemaTable";
import ContactUs from "./components/ContactUs";
import Footer from "./components/Footer";
import UserList from "./components/UserList";
import { useAuth } from "./components/auth/AuthProvider";
import GuestNavbar from "./components/GuestNavbar";
import Cinemas from "./components/order/Cinemas";
import TicketBook from "./components/order/TicketBook";
import UserOrders from "./components/order/UserOrders";

function App() {
  const { auth } = useAuth();
  return (
    <React.StrictMode>
      <Router>
        {auth ? <NavBar /> : <GuestNavbar />}
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/AboutUs" element={<AboutUs />}></Route>
            <Route path="/Movies" element={<Movie />}></Route>

            <Route path="/SignIn" element={<SignIn />}></Route>
            <Route path="/SignUp" element={<SignUp />}></Route>
            <Route path="/UserProfile" element={<UserProfile />}></Route>
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/CreateMovie" element={<CreateMovie />}></Route>
            <Route path="/CinemaTable" element={<CinemaTable />}></Route>
            <Route path="/UserList" element={<UserList />}></Route>
            <Route path="/Cinemas/:movie_id" element={<Cinemas />}></Route>
            <Route path="/Book/:showtime_id" element={<TicketBook />}></Route>
            <Route path="/UserOrders" element={<UserOrders />}></Route>
          </Routes>
        </div>
      </Router>
    </React.StrictMode>
  );
}

export default App;
