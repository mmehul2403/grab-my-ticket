import React from "react";
import TestQuery from "./components/TestQuery";
import AboutUs from "./components/AboutUs";
import Home from "./components/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Movie from "./components/Movie";
import CreateMovie from "./components/Admin/CreateMovie";

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
            <Route path="/CreateMovie" element={<CreateMovie />}></Route>
          </Routes>
        </div>
      </Router>
    </React.StrictMode>
  );
}

export default App;
