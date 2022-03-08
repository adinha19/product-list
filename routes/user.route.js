const express = require("express");
const router = express.Router();
const userController = require('../controllers/user.controller')
const passport = require('passport')
const { userValidator, changePasswordValidator } = require('../utils/validators/user.validator')

//validator for inputs for signup
router.post("/signup", userValidator, userController.signup)
router.post('/login', userController.login)

//validator for password if changing password
router.put('/change-password', changePasswordValidator, passport.authenticate('jwt', { session: false }), userController.changePassword)

module.exports = router;