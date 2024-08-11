// Import required modules
const bcrypt = require('bcrypt');
const User = require('../models/User');

// Define the UserService class to handle user-related operations
class UserService {
  
  /**
   * Creates a new user and saves it to the database.
   * @param {string} username - The username of the user.
   * @param {string} email - The email of the user.
   * @param {string} password - The password of the user.
   * @param {string} userType - The type of user (e.g., regular, admin).
   * @param {boolean} [isAdmin=false] - Flag indicating if the user is an admin.
   * @returns {Promise<User>} - The created user.
   * @throws {Error} - Throws an error if creation fails.
   */
  async createUser(username, email, password, userType, isAdmin = false) {
    try {
      // Validate input fields
      if (!username || !email || !password || !userType) {
        throw new Error('All fields are required');
      }
  
      // Convert to lowercase for consistency
      username = username.toLowerCase();
      email = email.toLowerCase();
  
      // Check if the username or email already exists
      const existingUser = await User.findOne({
        $or: [{ username: username }, { email: email }]
      });
  
      if (existingUser) {
        return existingUser; // User already exists
      }
  
      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({
        username,
        email,
        password: hashedPassword,
        userType,
        isAdmin
      });
  
      // Save the new user to the database
      await user.save();
      return user;
    } catch (error) {
      console.error(`Error creating user: ${error.message}`);
      
      // Handle duplicate key errors
      if (error.code === 11000) { // MongoDB duplicate key error code
        console.log(`Duplicate key error: ${error.message}`);
        
        // Find and return the existing user if it already exists
        const existingUser = await User.findOne({
          $or: [{ username: username.toLowerCase() }, { email: email.toLowerCase() }]
        });
  
        if (existingUser) {
          return existingUser;
        }
  
        // If no existing user found, rethrow the error
        throw new Error(`User creation failed due to a duplicate key: ${error.message}`);
      } else {
        // For other errors, rethrow the error
        throw new Error(`User creation failed: ${error.message}`);
      }
    }
  }
  
  /**
   * Finds a user by username, email, or userType.
   * @param {string|null} username - The username of the user to find.
   * @param {string|null} email - The email of the user to find.
   * @param {string|null} userType - The type of user to find.
   * @returns {Promise<User|null>} - The found user or null if not found.
   * @throws {Error} - Throws an error if the search fails.
   */
  async findByUsernameOrEmail(username = null, email = null, userType = null) {
    const query = {};
    if (username) query.username = username.toLowerCase();
    if (email) query.email = email.toLowerCase();
    if (userType) query.userType = userType;
    
    try {
      const result = await User.findOne(query);
      return result;
    } catch (err) {
      console.error(`Error finding user: ${err.message}`);
      throw new Error(`Error finding user: ${err.message}`);
    }
  }

  /**
   * Logs in a user by verifying their password.
   * @param {string} usernameOrEmail - The username or email of the user.
   * @param {string} password - The password to verify.
   * @returns {Promise<User|null>} - The logged-in user or null if login fails.
   * @throws {Error} - Throws an error if the login process fails.
   */
  async loginUser(usernameOrEmail, password) {
    try {
      // Find the user by username or email
      const user = await User.findOne({
        $or: [{ username: usernameOrEmail.toLowerCase() }, { email: usernameOrEmail.toLowerCase() }],
      });

      if (!user) {
        return null; // User not found
      }

      // Verify the password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return null; // Invalid password
      }

      return user; // Return the authenticated user
    } catch (err) {
      console.error(`Error logging in user: ${err.message}`);
      throw new Error(`Error logging in user: ${err.message}`);
    }
  }

  /**
   * Retrieves the admin assistant user.
   * @returns {Promise<User|null>} - The admin assistant user or null if not found.
   * @throws {Error} - Throws an error if the retrieval fails.
   */
  async getAdminAssistant() {
    try {
      return await User.findOne({ isAdminAssistant: true });
    } catch (err) {
      console.error(`Error fetching admin assistant: ${err.message}`);
      throw new Error(`Error fetching admin assistant: ${err.message}`);
    }
  }

  /**
   * Retrieves a user by their ID.
   * @param {string} id - The ID of the user to retrieve.
   * @returns {Promise<User>} - The found user.
   * @throws {Error} - Throws an error if the user is not found.
   */
  async getUserById(id) {
    try {
      const user = await User.findById(id);
      if (!user) throw new Error('User not found');
      return user;
    } catch (err) {
      console.error(`Error fetching user by ID: ${err.message}`);
      throw new Error(`Error fetching user by ID: ${err.message}`);
    }
  }

  /**
   * Retrieves all users from the database.
   * @returns {Promise<User[]>} - A list of all users.
   * @throws {Error} - Throws an error if the retrieval fails.
   */
  async getAllUsers() {
    try {
      return await User.find();
    } catch (err) {
      console.error(`Error fetching all users: ${err.message}`);
      throw new Error(`Error fetching all users: ${err.message}`);
    }
  }

  /**
   * Updates the balance of a user.
   * @param {string} id - The ID of the user to update.
   * @param {number} balance - The new balance to set.
   * @returns {Promise<User>} - The updated user.
   * @throws {Error} - Throws an error if the user is not found or the update fails.
   */
  async updateUserBalance(id, balance) {
    try {
      const user = await User.findById(id);
      if (!user) throw new Error('User not found');
      user.balance = balance;
      await user.save();
      return user;
    } catch (err) {
      console.error(`Error updating user balance: ${err.message}`);
      throw new Error(`Error updating user balance: ${err.message}`);
    }
  }
}

// Export a single instance of UserService
module.exports = new UserService();
