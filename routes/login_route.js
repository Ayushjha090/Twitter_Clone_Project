const express = require('express');
const passport = require('passport');

const loginController = require('../controllers/login_controller');

const router = express.Router();

router.get('/', loginController.login);
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/login'}
), loginController.createSession);

module.exports = router;