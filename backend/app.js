require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();

const indexRoutes = require('./routes/index');
const userRoutes = require('./routes/users');
const voucherRoutes = require('./routes/vouchers');
const purchaseRoutes = require('./routes/purchase');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Use built-in middleware to parse JSON
app.use(express.json());

// Define routes
app.use('/', indexRoutes);
app.use('/users', userRoutes);
app.use('/vouchers', voucherRoutes);
app.use('/purchase', purchaseRoutes);

// Start the server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });
  

module.exports = app;
