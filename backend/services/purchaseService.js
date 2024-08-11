// Import required models
const PurchasedVoucher = require('../models/PurchasedVoucher');
const User = require('../models/User');
const Voucher = require('../models/Voucher');

// Define the PurchaseService class to handle voucher purchasing and retrieval
class PurchaseService {
  
  /**
   * Allows a user to purchase a voucher.
   * @param {string} userId - The ID of the user purchasing the voucher.
   * @param {string} voucherId - The ID of the voucher being purchased.
   * @returns {Promise<PurchasedVoucher>} - The created PurchasedVoucher document.
   * @throws {Error} - Throws an error if the user, voucher is not found or if there is insufficient balance.
   */
  async purchaseVoucher(userId, voucherId) {
    // Find the user and voucher by their IDs
    const user = await User.findById(userId);
    const voucher = await Voucher.findById(voucherId);

    // Check if the user and voucher exist
    if (!user) throw new Error('User not found');
    if (!voucher) throw new Error('Voucher not found');
    
    // Check if the user has enough balance to purchase the voucher
    if (user.balance < voucher.cost) throw new Error('Insufficient balance');

    // Deduct the voucher cost from the user's balance
    user.balance -= voucher.cost;
    await user.save();

    // Create and save a new PurchasedVoucher document
    const purchasedVoucher = new PurchasedVoucher({ userId, voucherId });
    await purchasedVoucher.save();

    // Return the created PurchasedVoucher document
    return purchasedVoucher;
  }

  /**
   * Retrieves all vouchers purchased by a specific user.
   * @param {string} userId - The ID of the user whose purchased vouchers are to be retrieved.
   * @returns {Promise<PurchasedVoucher[]>} - A list of PurchasedVoucher documents.
   * @throws {Error} - Throws an error if the user is not found.
   */
  async getUserPurchasedVouchers(userId) {
    // Find the user by their ID and populate purchasedVouchers with related Voucher data
    const user = await User.findById(userId).populate({
      path: 'purchasedVouchers',   // Path to the purchased vouchers
      populate: { path: 'voucherId', model: 'Voucher' } // Populate each purchased voucher with voucher details
    });

    // Check if the user exists
    if (!user) throw new Error('User not found');

    // Return the list of purchased vouchers
    return user.purchasedVouchers;
  }

  /**
   * Retrieves a user by their ID.
   * @param {string} userId - The ID of the user to retrieve.
   * @returns {Promise<User>} - The User document.
   */
  async getUserById(userId) {
    // Find and return the user by their ID
    return await User.findById(userId);
  }
}

// Export a single instance of PurchaseService
module.exports = new PurchaseService();
