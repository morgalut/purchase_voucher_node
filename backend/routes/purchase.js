const express = require('express');
const router = express.Router();
const purchaseController = require('../controllers/purchaseController');

// Route to get all purchased vouchers (for all users)
router.get('/purchases', async (req, res) => {
    try {
      const purchases = await PurchasedVoucher.find().populate('voucherId');
      res.status(200).json(purchases);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
});

// Route to get all purchased vouchers for a user
router.get('/purchases/:id', purchaseController.getUserPurchasedVouchers);

module.exports = router;
