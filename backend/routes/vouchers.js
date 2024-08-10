const express = require('express');
const router = express.Router();
const voucherController = require('../controllers/voucherController');

// Route to get all vouchers
router.get('/', voucherController.getAllVouchers);

// Other voucher-related routes
router.post('/', voucherController.createVoucher);
router.get('/:id', voucherController.getVoucherById);
router.put('/:id', voucherController.updateVoucher);
router.delete('/:id', voucherController.deleteVoucher);

module.exports = router;
