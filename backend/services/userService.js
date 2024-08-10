const bcrypt = require("bcrypt");
const User = require("../models/User");

class UserService {
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
    
            // Create a new user with hashed password
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new User({
                username,
                email,
                password: hashedPassword,
                userType,
                isAdmin
            });
    
            // Attempt to save the user
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

    async loginUser(usernameOrEmail, password) {
        try {
            const user = await User.findOne({
                $or: [{ username: usernameOrEmail.toLowerCase() }, { email: usernameOrEmail.toLowerCase() }],
            });

            if (!user) {
                return null;
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return null;
            }

            return user;
        } catch (err) {
            console.error(`Error logging in user: ${err.message}`);
            throw new Error(`Error logging in user: ${err.message}`);
        }
    }

    async getAdminAssistant() {
        try {
            return await User.findOne({ isAdminAssistant: true });
        } catch (err) {
            console.error(`Error fetching admin assistant: ${err.message}`);
            throw new Error(`Error fetching admin assistant: ${err.message}`);
        }
    }

    async getUserById(id) {
        try {
            const user = await User.findById(id);
            if (!user) throw new Error("User not found");
            return user;
        } catch (err) {
            console.error(`Error fetching user by ID: ${err.message}`);
            throw new Error(`Error fetching user by ID: ${err.message}`);
        }
    }

    async getAllUsers() {
        try {
            return await User.find();
        } catch (err) {
            console.error(`Error fetching all users: ${err.message}`);
            throw new Error(`Error fetching all users: ${err.message}`);
        }
    }

    async updateUserBalance(id, balance) {
        try {
            const user = await User.findById(id);
            if (!user) throw new Error("User not found");
            user.balance = balance;
            await user.save();
            return user;
        } catch (err) {
            console.error(`Error updating user balance: ${err.message}`);
            throw new Error(`Error updating user balance: ${err.message}`);
        }
    }
}

module.exports = new UserService();
