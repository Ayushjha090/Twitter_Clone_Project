const express = require('express');
const logoutController = require('../controllers/logout_controller');

const router = express.Router();

router.get('/', logoutController.signout);

module.exports = router;