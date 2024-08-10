const PurchaseService = require('../services/purchaseService');

class PurchaseController {
  async purchaseVoucher(req, res) {
    const { userId, voucherId } = req.body;
    try {
      if (!userId || !voucherId) {
        return res.status(400).json({ error: 'User ID and Voucher ID are required.' });
      }
      const purchase = await PurchaseService.purchaseVoucher(userId, voucherId);
      res.status(201).json(purchase);
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
module.exports = new PurchaseController();
