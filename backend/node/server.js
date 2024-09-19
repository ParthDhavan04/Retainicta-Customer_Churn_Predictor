const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const User = require('./models/User');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Define the route to handle requests from React and pass to Flask
app.post('/api/predict', async (req, res) => {
  try {
    // Send the request data to Flask
    const response = await axios.post('http://localhost:5000/predict', req.body);
    
    // Send Flask's prediction result back to React
    res.json(response.data);
  } catch (error) {
    console.error('Error communicating with Flask backend:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// Signup Route
app.post('/api/signup', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = new User({ username, email, password });
    await user.save();
    res.status(201).json({ message: 'User created' });
  } catch (error) {
    console.error('Error creating user:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// Login Route
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error('Error logging in user:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Node.js server listening on port ${port}`);
});
