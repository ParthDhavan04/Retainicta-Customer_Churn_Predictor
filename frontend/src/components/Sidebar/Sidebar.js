// src/components/Sidebar/Sidebar.js
import React from 'react';
import './Sidebar.css';

const Sidebar = ({ isVisible }) => {
  return (
    <div className={`sidebar ${isVisible ? 'visible' : 'hidden'}`}>
      <h1>RETAINICTA</h1>
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/predict">Predict</a></li>
          <li><a href="/about-us">About Us</a></li>
          <li><a href="/contact-us">Contact Us</a></li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
