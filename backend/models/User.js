const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true }, // Ensure uniqueness
  email: { type: String, required: true, unique: true }, // Ensure uniqueness
  password: { type: String, required: true },
  balance: { type: Number, required: true },
  isAdminAssistant: { type: Boolean, default: false },
  userType: { type: String, enum: ['ordinary', 'executive'], required: true }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
