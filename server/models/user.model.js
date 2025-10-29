// server/models/user.model.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['participant', 'admin', 'judge'],
    default: 'participant',
  },
  // --- ADD THIS FIELD ---
  team: {
    type: mongoose.Schema.Types.ObjectId, // This is how you store a reference to another document
    ref: 'Team', // This tells Mongoose the 'team' field refers to the 'Team' model
    default: null,
  },
  // --------------------
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);
module.exports = User;