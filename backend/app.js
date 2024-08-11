// Load environment variables from a .env file into process.env
require('dotenv').config();

// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import CORS for handling cross-origin requests

// Initialize Express application
const app = express();

// Import route modules
const userRoutes = require('./routes/users');
const voucherRoutes = require('./routes/vouchers');
const purchaseRoutes = require('./routes/purchase');

// Connect to MongoDB using the connection string from environment variables
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Use CORS middleware to allow cross-origin requests from different domains
app.use(cors()); // By default, CORS is enabled for all routes and origins

// Use built-in middleware to parse incoming JSON requests
app.use(express.json());

// Define API routes and associate them with route handlers
app.use('/users', userRoutes); // Routes related to user operations
app.use('/vouchers', voucherRoutes); // Routes related to voucher operations
app.use('/purchase', purchaseRoutes); // Routes related to voucher purchases

// Start the server and listen on a port specified in environment variables or default to 3002
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Error handling middleware for catching and responding to errors
app.use((err, req, res, next) => {
  console.error('Server error:', err.stack);
  res.status(500).send('Something went wrong!');
});

// Export the app for use in other files (e.g., for testing)
module.exports = app;
