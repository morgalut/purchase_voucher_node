// Import required modules
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Define routes for user-related operations

/**
 * @route GET /users/:id
 * @desc Retrieve a user by their ID
 * @access Public
 * @param {string} id - The ID of the user to retrieve
 */
router.get('/:id', userController.getUserById);

/**
 * @route GET /users
 * @desc Retrieve all users
 * @access Public
 */
router.get('/', userController.getAllUsers);

/**
 * @route PUT /users/:id/balance
 * @desc Update the balance of a specific user by their ID
 * @access Public
 * @param {string} id - The ID of the user whose balance is to be updated
 */
router.put('/:id/balance', userController.updateUserBalance);

/**
 * @route POST /users
 * @desc Create a new user
 * @access Public
 */
router.post('/', userController.createUser);

/**
 * @route POST /users/login
 * @desc Log in a user
 * @access Public
 */
router.post('/login', userController.loginUser);

/**
 * @route POST /users/logout
 * @desc Log out the currently logged-in user
 * @access Public
 */
router.post('/logout', userController.logoutUser);

// Export the router to be used in the main application file
module.exports = router;
