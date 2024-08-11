// Import the PurchaseService to handle business logic
const PurchaseService = require('../services/purchaseService');

// Define the PurchaseController class to handle HTTP requests related to purchases
class PurchaseController {
  // Method to handle the purchase of a voucher
  async purchaseVoucher(req, res) {
    // Extract userId and voucherId from the request body
    const { userId, voucherId } = req.body;

    try {
      // Validate input
      if (!userId || !voucherId) {
        return res.status(400).json({ error: 'User ID and Voucher ID are required.' });
      }
      
      // Call the service to handle the purchase and update user balance
      const purchase = await PurchaseService.purchaseVoucher(userId, voucherId);
      
      // Fetch the updated user balance
      const updatedUser = await PurchaseService.getUserById(userId);

      // Return a success response with the purchase details and updated balance
      res.status(201).json({ purchase, balance: updatedUser.balance });
    } catch (error) {
      // Return an error response if something goes wrong
      res.status(400).json({ error: error.message });
    }
  }

  // Method to get all purchased vouchers for a specific user
  async getUserPurchasedVouchers(req, res) {
    // Extract user ID from request parameters
    const { id } = req.params;

    try {
      // Fetch the user's purchased vouchers
      const purchases = await PurchaseService.getUserPurchasedVouchers(id);
      // Return a success response with the purchased vouchers
      res.status(200).json(purchases);
    } catch (error) {
      // Return an error response if something goes wrong
      res.status(404).json({ error: error.message });
    }
  }
}

// Export an instance of the PurchaseController class
module.exports = new PurchaseController();
