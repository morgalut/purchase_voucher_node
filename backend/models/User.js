// Import the mongoose library to interact with MongoDB
const mongoose = require('mongoose');

// Define the schema for the User model
const userSchema = new mongoose.Schema({
    // Username of the user
    username: { 
        type: String, 
        required: true, 
        unique: true 
    },
    
    // Email address of the user
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    
    // Password of the user (hashed)
    password: { 
        type: String, 
        required: true 
    },
    
    // Type of user (e.g., regular, premium, etc.)
    userType: { 
        type: String, 
        required: true 
    },
    
    // Boolean flag indicating if the user has admin privileges
    isAdmin: { 
        type: Boolean, 
        default: false 
    },
    
    // User's current balance
    balance: { 
        type: Number, 
        default: 0 // Changed from null to 0 to ensure a default value for balance
    }
}, { 
    timestamps: true // Automatically add createdAt and updatedAt fields
});

// Create and export the User model using the defined schema
const User = mongoose.model('User', userSchema);

module.exports = User;
