const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/:id', userController.getUserById);
router.get('/', userController.getAllUsers);
router.put('/:id/balance', userController.updateUserBalance);
router.post('/', userController.createUser);
router.post('/login', userController.loginUser);
router.post('/logout', userController.logoutUser);

module.exports = router;
