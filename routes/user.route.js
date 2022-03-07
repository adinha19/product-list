const express = require("express");
const router = express.Router();
const userController = require('../controllers/user.controller')
const passport = require('passport')

router.post("/signup", userController.signup)
router.post('/login', userController.login)

router.put('/change-password', passport.authenticate('jwt', { session: false }), userController.changePassword)

module.exports = router;