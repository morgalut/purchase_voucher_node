const bcrypt = require("bcrypt"); // Add this line
const UserService = require("../services/userService");
const logger = require("../logs/logger");
const jwt = require('jsonwebtoken'); // Import jsonwebtoken

class UserController {
  async createUser(req, res) {
    const {
      name,
      username,
      email,
      password,
      balance,
      isAdminAssistant,
      userType,
    } = req.body;
    try {
      // Check if an admin assistant already exists
      if (isAdminAssistant) {
        const existingAdmin = await UserService.getAdminAssistant();
        if (existingAdmin) {
          logger.error("Admin assistant already exists. Only one is allowed.");
          return res
            .status(400)
            .json({ error: "Admin assistant already exists." });
        }
      }

      // Validate userType
      const validUserTypes = ["ordinary", "executive"];
      if (!validUserTypes.includes(userType)) {
        logger.error('Invalid user type. Use "ordinary" or "executive".');
        return res.status(400).json({ error: "Invalid user type." });
      }

      // Check if username or email already exists
      const existingUser = await UserService.findByUsernameOrEmail(
        username,
        email
      );
      if (existingUser) {
        logger.error("Username or email already exists.");
        return res
          .status(400)
          .json({ error: "Username or email already exists." });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create user
      const user = await UserService.createUser(
        name,
        username,
        email,
        hashedPassword,
        balance,
        isAdminAssistant,
        userType
      );
      logger.info(`User created: ${JSON.stringify(user)}`);
      res.status(201).json({ message: "User created successfully", user });
    } catch (error) {
      logger.error(`User creation failed: ${error.message}`);
      res.status(400).json({ error: "User creation failed." });
    }
  }

  async getUserById(req, res) {
    const { id } = req.params;
    try {
      const user = await UserService.getUserById(id);
      if (!user) {
        logger.warn(`User not found: ${id}`);
        return res.status(404).json({ error: "User not found." });
      }
      logger.info(`User fetched: ${JSON.stringify(user)}`);
      res.status(200).json(user);
    } catch (error) {
      logger.error(`Failed to fetch user: ${error.message}`);
      res.status(400).json({ error: "Failed to fetch user." });
    }
  }

  async getAllUsers(req, res) {
    try {
      const users = await UserService.getAllUsers();
      logger.info("All users fetched.");
      res.status(200).json(users);
    } catch (error) {
      logger.error(`Failed to fetch users: ${error.message}`);
      res.status(400).json({ error: "Failed to fetch users." });
    }
  }

  async updateUserBalance(req, res) {
    const { id } = req.params;
    const { balance } = req.body;
    try {
      const user = await UserService.updateUserBalance(id, balance);
      if (!user) {
        logger.warn(`User not found: ${id}`);
        return res.status(404).json({ error: "User not found." });
      }
      logger.info(`User balance updated: ${JSON.stringify(user)}`);
      res.status(200).json({ message: "Balance updated successfully", user });
    } catch (error) {
      logger.error(`Failed to update balance: ${error.message}`);
      res.status(400).json({ error: "Failed to update balance." });
    }
  }

  async loginUser(req, res) {
    const { usernameOrEmail, password } = req.body;
    try {
        // Authenticate user
        const user = await UserService.loginUser(usernameOrEmail, password);
        
        // Check if user is found and password matches
        if (!user) {
            console.error(`User not found: ${usernameOrEmail}`);
            return res.status(400).json({ error: 'Invalid username or email.' });
        }
        
        // Generate JWT token
        const token = jwt.sign(
            { id: user._id, username: user.username }, // Payload
            process.env.JWT_SECRET, // Secret key from environment variable
            { expiresIn: '1h' } // Token expiration
        );
        
        
        // Log user and token to terminal
        console.log(`Login successful for user: ${user.username}`);
        console.log(`Token: ${token}`);

        // Return token and user details
        res.status(200).json({ message: 'Login successful', token, user });
    } catch (error) {
        logger.error(`Login failed: ${error.message}`);
        
        // Print error details to terminal
        console.error(`Login failed for usernameOrEmail: ${usernameOrEmail}`);
        console.error(`Error: ${error.message}`);
        
        res.status(400).json({ error: 'Login failed.' });
    }
}
}

module.exports = new UserController();
