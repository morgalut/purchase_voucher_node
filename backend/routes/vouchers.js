// Import required modules
const express = require('express');
const router = express.Router();
const voucherController = require('../controllers/voucherController');

// Define routes for voucher-related operations

/**
 * @route GET /vouchers
 * @desc Retrieve all vouchers
 * @access Public
 */
router.get('/', voucherController.getAllVouchers);

/**
 * @route POST /vouchers
 * @desc Create a new voucher
 * @access Public
 */
router.post('/', voucherController.createVoucher);

/**
 * @route GET /vouchers/:id
 * @desc Retrieve a voucher by its ID
 * @access Public
 * @param {string} id - The ID of the voucher to retrieve
 */
router.get('/:id', voucherController.getVoucherById);

/**
 * @route PUT /vouchers/:id
 * @desc Update a voucher by its ID
 * @access Public
 * @param {string} id - The ID of the voucher to update
 */
router.put('/:id', voucherController.updateVoucher);

/**
 * @route DELETE /vouchers/:id
 * @desc Delete a voucher by its ID
 * @access Public
 * @param {string} id - The ID of the voucher to delete
 */
router.delete('/:id', voucherController.deleteVoucher);

// Export the router to be used in the main application file
module.exports = router;
