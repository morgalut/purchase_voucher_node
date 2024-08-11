// Import required modules
const express = require('express');
const router = express.Router();
const purchaseController = require('../controllers/purchaseController');
const PurchasedVoucher = require('../models/PurchasedVoucher'); // Import the PurchasedVoucher model

// Define routes for purchase-related operations

/**
 * @route GET /purchases
 * @desc Retrieve all purchased vouchers (for all users)
 * @access Public
 */
router.get('/purchases', async (req, res) => {
    try {
        // Fetch all purchased vouchers and populate voucherId with related voucher details
        const purchases = await PurchasedVoucher.find().populate('voucherId');
        res.status(200).json(purchases);
    } catch (error) {
        // Handle errors by returning a 404 status with the error message
        res.status(404).json({ error: error.message });
    }
});

/**
 * @route GET /purchases/:id
 * @desc Retrieve all purchased vouchers for a specific user
 * @access Public
 * @param {string} id - The ID of the user whose purchased vouchers are to be retrieved
 */
router.get('/purchases/:id', purchaseController.getUserPurchasedVouchers);

/**
 * @route POST /purchases
 * @desc Purchase a voucher for a user
 * @access Public
 */
router.post('/', purchaseController.purchaseVoucher);

// Export the router to be used in the main application file
module.exports = router;
