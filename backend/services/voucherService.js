// Import the Voucher model
const Voucher = require('../models/Voucher');

// Define the VoucherService class to handle voucher-related operations
class VoucherService {
  
  /**
   * Creates a new voucher and saves it to the database.
   * @param {number} amount - The amount of the voucher.
   * @param {number} cost - The cost of the voucher.
   * @param {string} company - The company issuing the voucher.
   * @returns {Promise<Voucher>} - The created voucher.
   */
  async createVoucher(amount, cost, company) {
    // Create a new Voucher instance with the provided data
    const voucher = new Voucher({ amount, cost, company });
    
    // Save the voucher to the database
    await voucher.save();
    
    // Return the saved voucher
    return voucher;
  }

  /**
   * Retrieves a voucher by its ID.
   * @param {string} id - The ID of the voucher to retrieve.
   * @returns {Promise<Voucher>} - The found voucher.
   * @throws {Error} - Throws an error if the voucher is not found.
   */
  async getVoucherById(id) {
    // Find a voucher by its ID
    const voucher = await Voucher.findById(id);
    
    // Throw an error if the voucher is not found
    if (!voucher) throw new Error('Voucher not found');
    
    // Return the found voucher
    return voucher;
  }

  /**
   * Retrieves all vouchers from the database.
   * @returns {Promise<Voucher[]>} - A list of all vouchers.
   */
  async getAllVouchers() {
    // Find and return all vouchers
    return await Voucher.find();
  }

  /**
   * Updates an existing voucher with new data.
   * @param {string} id - The ID of the voucher to update.
   * @param {number} amount - The new amount of the voucher.
   * @param {number} cost - The new cost of the voucher.
   * @param {string} company - The new company issuing the voucher.
   * @returns {Promise<Voucher>} - The updated voucher.
   * @throws {Error} - Throws an error if the voucher is not found.
   */
  async updateVoucher(id, amount, cost, company) {
    // Find the voucher by its ID
    const voucher = await Voucher.findById(id);
    
    // Throw an error if the voucher is not found
    if (!voucher) throw new Error('Voucher not found');
    
    // Update the voucher's properties with the new data
    voucher.amount = amount;
    voucher.cost = cost;
    voucher.company = company;
    
    // Save the updated voucher to the database
    await voucher.save();
    
    // Return the updated voucher
    return voucher;
  }

  /**
   * Deletes a voucher by its ID.
   * @param {string} id - The ID of the voucher to delete.
   * @returns {Promise<Voucher>} - The deleted voucher.
   * @throws {Error} - Throws an error if the voucher is not found.
   */
  async deleteVoucher(id) {
    // Find and delete the voucher by its ID
    const result = await Voucher.findByIdAndDelete(id);
    
    // Throw an error if the voucher is not found
    if (!result) throw new Error('Voucher not found');
    
    // Return the deleted voucher
    return result;
  }
}

// Export a single instance of VoucherService
module.exports = new VoucherService();
