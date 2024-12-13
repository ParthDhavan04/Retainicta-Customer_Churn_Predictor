// src/components/Signup/Signup.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const username = e.target.username.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (response.ok) {
        setSignupSuccess(true);
        // Redirect to login page after successful signup
        setTimeout(() => navigate('/login'), 2000); // Optional delay for user feedback
      } else {
        const data = await response.json();
        setError(data.error || 'Signup failed');
      }
    } catch (error) {
      setError('Server error');
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h2>Sign Up</h2>
        {!signupSuccess ? (
          <>
            <form onSubmit={handleSubmit}>
              <label htmlFor="username">Username</label>
              <input type="text" id="username" name="username" required />
              
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" required />
              
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" required />
              
              <button type="submit">Sign Up</button>
              {error && <p className="error-message">{error}</p>}
            </form>
            <button onClick={() => navigate('/')} className="btn-back-to-home">
              Go to Home
            </button>
            <button onClick={() => navigate('/login')} className="btn-back-to-login">
              Go to Login
            </button>
          </>
        ) : (
          <div className="signup-success">
            <p>Signup successful! Redirecting to login...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Signup;
