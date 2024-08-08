const express = require('express');
const router = express.Router();
const purchaseController = require('../controllers/purchaseController');

router.post('/', purchaseController.purchaseVoucher);
router.get('/:id', purchaseController.getUserPurchasedVouchers);

module.exports = router;
