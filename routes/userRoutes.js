const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
// Định tuyến cho người dùng
router.get('/', userController.getUsers);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser)
router.delete('/:id', userController.deleteUsers)
module.exports = router;
