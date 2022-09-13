const express = require('express');
const registerController = require('../controllers/register_controller');

const router = express.Router();

router.get('/', registerController.signUp);
router.post('/create', registerController.create);

module.exports = router;