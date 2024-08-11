// Import the mongoose library to work with MongoDB
const mongoose = require('mongoose');

// Define the schema for the Voucher model
const voucherSchema = new mongoose.Schema({
  // The number of vouchers available
  amount: { 
    type: Number, 
    required: true 
  },
  
  // The cost of each voucher
  cost: { 
    type: Number, 
    required: true 
  },
  
  // The company issuing the voucher
  company: { 
    type: String, 
    required: true 
  }
}, { 
  timestamps: true // Automatically add createdAt and updatedAt fields
});

// Create and export the Voucher model using the defined schema
const Voucher = mongoose.model('Voucher', voucherSchema);

module.exports = Voucher;
