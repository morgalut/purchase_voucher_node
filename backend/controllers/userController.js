const UserService = require("../services/userService");
const logger = require("../logs/logger");
const jwt = require("jsonwebtoken");

class UserController {
    async createUser(req, res) {
        const { username, email, password, userType } = req.body;
        
        try {
            // Validate input
            if (!username || !email || !password || !userType) {
                logger.error('User creation failed: Missing required fields.');
                return res.status(400).json({ error: "All fields are required." });
            }

            const validUserTypes = ["regular", "manager"];
            if (!validUserTypes.includes(userType)) {
                logger.error(`User creation failed: Invalid user type "${userType}".`);
                return res.status(400).json({ error: "Invalid user type." });
            }

            // Check if the user is an admin and has the rights
            const isAdmin = req.user && req.user.userType === 'manager';

            // Create the user
            const user = await UserService.createUser(username, email, password, userType, isAdmin);

            logger.info(`User created successfully: ${JSON.stringify(user)}`);
            return res.status(201).json({ message: "User created successfully", user });
        } catch (error) {
            logger.error(`User creation failed: ${error.message}`);
            return res.status(500).json({ error: error.message || "User creation failed due to server error." });
        }
    }
  async getUserById(req, res) {
    const { id } = req.params;
    try {
      const user = await UserService.getUserById(id);
      if (!user) {
        logger.warn(`User fetch failed: No user found with ID ${id}`);
        return res.status(404).json({ error: "User not found." });
      }
      logger.info(`User fetched successfully: ${JSON.stringify(user)}`);
      res.status(200).json(user);
    } catch (error) {
      logger.error(`User fetch failed due to server error: ${error.message}`);
      res
        .status(500)
        .json({ error: "Failed to fetch user due to server error." });
    }
  }

  async getAllUsers(req, res) {
    try {
      const users = await UserService.getAllUsers();
      logger.info("All users fetched successfully.");
      res.status(200).json(users);
    } catch (error) {
      logger.error(
        `Failed to fetch users due to server error: ${error.message}`
      );
      res
        .status(500)
        .json({ error: "Failed to fetch users due to server error." });
    }
  }

  async updateUserBalance(req, res) {
    const { id } = req.params;
    const { balance } = req.body;
    try {
      const user = await UserService.updateUserBalance(id, balance);
      if (!user) {
        logger.warn(`Balance update failed: No user found with ID ${id}`);
        return res.status(404).json({ error: "User not found." });
      }
      logger.info(`User balance updated successfully: ${JSON.stringify(user)}`);
      res.status(200).json({ message: "Balance updated successfully", user });
    } catch (error) {
      logger.error(
        `Balance update failed due to server error: ${error.message}`
      );
      res
        .status(500)
        .json({ error: "Failed to update balance due to server error." });
    }
  }

  async loginUser(req, res) {
    const { usernameOrEmail, password } = req.body;
    try {
      if (!usernameOrEmail || !password) {
        logger.warn("Missing username/email or password");
        return res
          .status(400)
          .json({ error: "Username/Email and password are required" });
      }

      const user = await UserService.loginUser(usernameOrEmail, password);
      if (!user) {
        logger.warn("Invalid username/email or password");
        return res
          .status(401)
          .json({ error: "Invalid username/email or password" });
      }

      // Generate JWT token
      const token = jwt.sign(
        {
          id: user._id,
          username: user.username,
          email: user.email,
          userType: user.userType,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      logger.info(`User ${usernameOrEmail} logged in successfully`);
      res.status(200).json({ message: "Login successful", token });
    } catch (error) {
      logger.error(`Login failed due to server error: ${error.message}`);
      res.status(500).json({ error: "Failed to login due to server error." });
    }
  }

  async logoutUser(req, res) {
    try {
      // Ideally, you would handle token invalidation on the client-side
      res.status(200).json({ message: "Logout successful" });
    } catch (error) {
      logger.error(`Logout failed due to server error: ${error.message}`);
      res.status(500).json({ error: "Logout failed due to server error." });
    }
  }
  async updateUserBalance(req, res) {
    const { id } = req.params;
    const { balance } = req.body;
    try {
        const user = await UserService.updateUserBalance(id, balance);
        if (!user) {
            logger.warn(`Balance update failed: No user found with ID ${id}`);
            return res.status(404).json({ error: "User not found." });
        }
        logger.info(`User balance updated successfully: ${JSON.stringify(user)}`);
        res.status(200).json({ message: "Balance updated successfully", user });
    } catch (error) {
        logger.error(`Balance update failed due to server error: ${error.message}`);
        res.status(500).json({ error: "Failed to update balance due to server error." });
    }
}
}

module.exports = new UserController();
