const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userType: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    balance: { type: Number, default: null }, // Add this line
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
