const mongoose = require('mongoose');

const voucherSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  cost: { type: Number, required: true },
  company: { type: String, required: true }
});

module.exports = mongoose.model('Voucher', voucherSchema);
