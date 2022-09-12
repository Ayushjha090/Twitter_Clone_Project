const express = require('express');
const homeController = require('../controllers/home_controller');

const router = express.Router();

router.get('/', homeController.home);
// Route for login page
router.use('/login', require('./login_route'));
// Route for signup page
router.use('/register', require('./register_route'));

module.exports = router;