// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home'
import Signup from './Pages/Signup/Signup';
import Login from './Pages/Login/Login';
import Predict from './Pages/Predict/Predict';
import ContactUs from './Pages/Contactus/ContactUs.jsx';
import AboutUs from './Pages/AboutUs/AboutUs.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/predict" element={<Predict />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/about-us" element={<AboutUs />} />
      </Routes>
    </Router>
  );
}

export default App;
