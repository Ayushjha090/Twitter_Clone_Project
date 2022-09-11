const express = require('express');
const registerController = require('../controllers/register_controller');

const router = express.Router();

router.get('/', registerController.signUp);

module.exports = router;