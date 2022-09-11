const express = require('express');
const homeController = require('../controllers/home_controller');

const router = express.Router();

router.get('/', homeController.home);
router.use('/login', require('./login_route'));
router.use('/register', require('./register_route'));

module.exports = router;