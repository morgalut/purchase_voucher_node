const PurchasedVoucher = require('../models/PurchasedVoucher');
const User = require('../models/User');
const Voucher = require('../models/Voucher');

class PurchaseService {
  async purchaseVoucher(userId, voucherId) {
    const user = await User.findById(userId);
    const voucher = await Voucher.findById(voucherId);

    if (!user) throw new Error('User not found');
    if (!voucher) throw new Error('Voucher not found');
    if (user.balance < voucher.cost) throw new Error('Insufficient balance');

    user.balance -= voucher.cost;
    await user.save();

    const purchasedVoucher = new PurchasedVoucher({ userId, voucherId });
    await purchasedVoucher.save();

    // Ensure purchasedVouchers array exists
    if (!user.purchasedVouchers) {
      user.purchasedVouchers = [];
    }

    user.purchasedVouchers.push(purchasedVoucher);
    await user.save();

    return purchasedVoucher;
  }

  async getUserPurchasedVouchers(userId) {
    const user = await User.findById(userId).populate({
      path: 'purchasedVouchers',
      populate: { path: 'voucherId', model: 'Voucher' }
    });

    if (!user) throw new Error('User not found');

    return user.purchasedVouchers;
  }
}

module.exports = new PurchaseService();
