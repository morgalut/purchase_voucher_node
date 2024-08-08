// C:\Users\Mor\Desktop\last\backend\routes\users.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/', userController.createUser);
router.get('/:id', userController.getUserById);
router.get('/', userController.getAllUsers);
router.put('/:id/balance', userController.updateUserBalance);
router.post('/login', userController.loginUser);

module.exports = router;
