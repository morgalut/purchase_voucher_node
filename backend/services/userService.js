const bcrypt = require('bcrypt');
const User = require('../models/User');

class UserService {
    async createUser(username, email, password, userType) {
        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
        const user = new User({
            username,
            email,
            password: hashedPassword, // Store the hashed password
            userType // Ensure userType is included
        });
        await user.save();
        return user;
    }

    async getAdminAssistant() {
        return await User.findOne({ isAdminAssistant: true });
    }

    async getUserById(id) {
        const user = await User.findById(id);
        if (!user) throw new Error('User not found');
        return user;
    }

    async getAllUsers() {
        return await User.find();
    }

    async updateUserBalance(id, balance) {
        const user = await User.findById(id);
        if (!user) throw new Error('User not found');
        user.balance = balance;
        await user.save();
        return user;
    }

    async findByUsernameOrEmail(username, email) {
        return await User.findOne({ $or: [{ username }, { email }] });
    }

    async loginUser(usernameOrEmail, password) {
        const user = await User.findOne({
            $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }]
        });
    
        if (!user) {
            console.log(`User not found for: ${usernameOrEmail}`);
            return null;
        }
    
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            console.log(`Password mismatch for user: ${usernameOrEmail}`);
            return null;
        }
    
        console.log(`User found and password valid for: ${usernameOrEmail}`);
        return user;
    }
    
    }
    

module.exports = new UserService();
