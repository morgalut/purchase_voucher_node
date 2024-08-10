// C:\Users\Mor\Desktop\last\backend\controllers\purchaseController.js
const PurchaseService = require('../services/purchaseService');

class PurchaseController {
  async purchaseVoucher(req, res) {
    const { userId, voucherId } = req.body;
    try {
      if (!userId || !voucherId) {
        return res.status(400).json({ error: 'User ID and Voucher ID are required.' });
      }
      
      // Purchase the voucher and handle balance updates
      const purchase = await PurchaseService.purchaseVoucher(userId, voucherId);
      
      // Fetch the updated user balance
      const updatedUser = await PurchaseService.getUserById(userId);

      res.status(201).json({ purchase, balance: updatedUser.balance });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getUserPurchasedVouchers(req, res) {
    const { id } = req.params;
    try {
      const purchases = await PurchaseService.getUserPurchasedVouchers(id);
      res.status(200).json(purchases);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
}

exports.purchaseVoucher = async (req, res) => {
  try {
    const { userId, voucherId } = req.body;
    if (!userId || !voucherId) {
      return res.status(400).json({ message: 'User ID and Voucher ID are required' });
    }

    const purchasedVoucher = await purchaseService.purchaseVoucher(userId, voucherId);

    // Return success response
    res.status(200).json(purchasedVoucher);
  } catch (error) {
    console.error('Error in purchaseVoucher:', error);
    res.status(500).json({ message: 'Error processing purchase' });
  }
};

module.exports = new PurchaseController();
