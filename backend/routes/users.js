const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/', userController.createUser);
router.get('/:id', userController.getUserById);
router.get('/', userController.getAllUsers);
router.put('/:id/balance', userController.updateUserBalance);
router.post('/logout', userController.logoutUser);  
router.post('/login', userController.loginUser); // Use userController instead of UserController

module.exports = router;
