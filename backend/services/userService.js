const bcrypt = require('bcrypt');
const User = require('../models/User');

class UserService {
    async createUser(name, username, email, password, balance, isAdminAssistant, userType) {
        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
        const user = new User({
            name,
            username,
            email,
            password: hashedPassword, // Store the hashed password
            balance,
            isAdminAssistant,
            userType
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
        const user = await User.findOne({ $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }] });
        if (!user) throw new Error('Invalid username or email');
        const isMatch = await bcrypt.compare(password, user.password); // Compare passwords
        if (!isMatch) throw new Error('Invalid password');
        return user;
    }
}

module.exports = new UserService();
