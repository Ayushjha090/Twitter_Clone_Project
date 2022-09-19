const express = require('express');
const passport = require('passport');
const homeController = require('../controllers/home_controller');

const router = express.Router();

router.get('/',  passport.checkAuthentication, homeController.home);
// Route for login page
router.use('/login', require('./login_route'));
// Route for signup page
router.use('/register', require('./register_route'));
// Router for signout page
router.use('/logout', require('./logout_route'));

module.exports = router;