const mongoose = require('mongoose');

const purchasedVoucherSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  voucherId: { type: mongoose.Schema.Types.ObjectId, ref: 'Voucher', required: true },
  purchaseDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('PurchasedVoucher', purchasedVoucherSchema);
