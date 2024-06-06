import React from "react";
import TestQuery from "./components/TestQuery";
import AboutUs from "./components/AboutUs";
import Home from "./components/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";

function App() {
  return (
    <React.StrictMode>
      <Router>
        <NavBar />
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/AboutUs" element={<AboutUs />}></Route>
          </Routes>
          {/*<TestQuery />
         <AboutUs />  <Home />*/}
        </div>
      </Router>
    </React.StrictMode>
  );
}

export default App;
