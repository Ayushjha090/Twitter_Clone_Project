const express = require('express');
const userController = require('../controllers/users_controller');

const router = express.Router();

router.get('/', userController.profile);
router.get('/profile', userController.profile);

module.exports = router;