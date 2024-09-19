// src/components/Home/Home.js
import React, { useState, useEffect, useCallback } from 'react'; // Add useCallback
import { Link } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import './Home.css';
import rightImage from '../../assets/right.png';

const Home = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  // Use useCallback to memoize the handler function
  const handleMouseMove = useCallback((e) => {
    const mouseX = e.clientX;

    // Show sidebar when mouse is near the left edge (within 100px from the left)
    if (mouseX < 100) {
      setSidebarVisible(true);
    } else {
      setSidebarVisible(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseMove]); // Include handleMouseMove in the dependency array

  return (
    <div className="home-container">
      <Sidebar className={sidebarVisible ? 'visible' : 'hidden'} />
      <div className="content">
        <div className="text-container">
          <h1 className="main-heading">
            Predict Tomorrow's <br /> Loyalty, Today
          </h1>
          <div className="sub-heading">
            A platform to predict the loyalty of your customers.
          </div>
          <div className="buttons">
            <Link to="/login">
              <button className="btn">Login</button>
            </Link>
            <Link to="/signup">
              <button className="btn">Signup</button>
            </Link>
          </div>
        </div>
        <img src={rightImage} alt="Background" className="background-image" />
      </div>
    </div>
  );
};

export default Home;
