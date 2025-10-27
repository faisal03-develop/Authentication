const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    // --- START OF FIX ---
    // Replaced 'name' and 'email' with 'username'
    username: { 
      type: String, 
      required: true, 
      unique: true, // Usernames should be unique
      lowercase: true // Good practice to store usernames in one case
    },
    // --- END OF FIX ---

    password: { type: String, required: true },
    role: { type: String, enum: ['Admin', 'Editor'], default: 'Editor' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);