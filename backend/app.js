require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import CORS
const app = express();

const userRoutes = require('./routes/users');
const voucherRoutes = require('./routes/vouchers');
const purchaseRoutes = require('./routes/purchase');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Use CORS middleware
app.use(cors()); // Enable CORS for all routes

// Use built-in middleware to parse JSON
app.use(express.json());

// Define routes
app.use('/users', userRoutes);
app.use('/vouchers', voucherRoutes);
app.use('/purchase', purchaseRoutes);

// Start the server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

module.exports = app;
