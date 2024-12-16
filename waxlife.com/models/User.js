const mongoose = require('mongoose');
const UserRole = require('../enums/UserRole'); // Import UserRole enum

// Define the schema
const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true, // Equivalent to `allowNull: false`
  },
  mobileNumber: {
    type: String,
    required: true,
    unique: true, // Ensures unique mobile numbers
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: Object.values(UserRole), // Use the enum values
    default: UserRole.USER, // Default role is 'user'
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set to current date and time
  },
});

// Create the model
const User = mongoose.model('User', userSchema);

module.exports = User;