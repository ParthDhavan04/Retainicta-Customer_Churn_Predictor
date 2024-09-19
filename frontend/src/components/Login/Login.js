// src/components/Login/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Login.css';

const Login = () => {
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize navigate

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        // Store token or user data as needed
        localStorage.setItem('token', data.token); // Example of storing token
        setLoginSuccess(true);
        setTimeout(() => {
          navigate('/predict'); // Redirect to Predict page
        }, 1000); // Redirect after 1 second for demo purposes
      } else {
        const data = await response.json();
        setError(data.error || 'Login failed');
      }
    } catch (error) {
      setError('Server error');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        {!loginSuccess ? (
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />
            
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required />
            
            <button type="submit">Login</button>
            {error && <p className="error-message">{error}</p>}
          </form>
        ) : (
          <div className="login-success">
            <p>Login successful! Redirecting...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
