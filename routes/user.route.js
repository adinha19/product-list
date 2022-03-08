const express = require("express");
const router = express.Router();
const userController = require('../controllers/user.controller')
const passport = require('passport')
const { userValidator, changePasswordValidator } = require('../utils/validators/user.validator')

router.post("/signup", userValidator, userController.signup)
router.post('/login', userController.login)

router.put('/change-password', changePasswordValidator, passport.authenticate('jwt', { session: false }), userController.changePassword)

module.exports = router;