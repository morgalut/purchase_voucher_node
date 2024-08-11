// Import mongoose library to work with MongoDB
const mongoose = require('mongoose');

// Define the schema for purchased vouchers
const purchasedVoucherSchema = new mongoose.Schema({
  // Reference to the User who purchased the voucher
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  
  // Reference to the Voucher that was purchased
  voucherId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Voucher', 
    required: true 
  },
  
  // Date when the voucher was purchased
  purchaseDate: { 
    type: Date, 
    default: Date.now 
  }
});

// Create and export the model using the schema
module.exports = mongoose.model('PurchasedVoucher', purchasedVoucherSchema);
