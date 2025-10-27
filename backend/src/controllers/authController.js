const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Assumes your model is in ../models/User

/**
 * @route   POST /auth/register
 * @desc    Register a new user
 */
exports.register = async (req, res) => {
  // Check for validation errors from routes/auth.js
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // We are returning the 400 error here now, instead of the controller
    return res.status(400).json({ errors: errors.array() });
  }

  // Destructure 'username' and 'password' from the request body
  const { username, password } = req.body;

  try {
    // Check if the user already exists by 'username'
    let user = await User.findOne({ username: username.toLowerCase() }); // Check lowercase
    if (user) {
      // Use 409 Conflict, which is more specific than 400
      return res.status(409).json({ message: 'Username already taken' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    // Create the new user with 'username'
    // 'role' will be set to the default 'Editor' from your schema
    user = new User({
      username: username.toLowerCase(), // Store as lowercase
      password: hashed,
    });

    // Save the user to the database
    await user.save();

    // Create the JWT payload
    const payload = { id: user._id, role: user.role };
    
    // Sign the token
    const token = jwt.sign(
      payload, 
      process.env.JWT_SECRET, 
      { expiresIn: '1h' } // 1 hour expiration
    );

    // Return the token and user info (excluding password)
    res.status(201).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
      },
    });

  } catch (err) {
    console.error(err.message); // Log the specific error to the server console
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * @route   POST /auth/login
 * @desc    Login a user and get token
 */
exports.login = async (req, res) => {
  // Check for validation errors
  // Note: Your routes/auth.js file still needs to be updated for login
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Destructure 'username' and 'password'
  const { username, password } = req.body;

  try {
    // Find the user by 'username'
    const user = await User.findOne({ username: username.toLowerCase() });
    if (!user) {
      // Don't say "user not found" for security, just "invalid credentials"
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare the submitted password with the hashed password in the DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create the JWT payload
    const payload = { id: user._id, role: user.role };

    // Sign and return the token
    const token = jwt.sign(
      payload, 
      process.env.JWT_SECRET, 
      { expiresIn: '1h' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
      },
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};