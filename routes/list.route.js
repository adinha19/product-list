const express = require("express");
const router = express.Router();
const listController = require('../controllers/list.controller')
const passport = require('passport')
const { listValidator } = require('../utils/validators/list.validator')

router.get("/:startDate/:endDate", passport.authenticate('jwt', { session: false }), listController.getProductsByDate)

router.post("/", listValidator, passport.authenticate('jwt', { session: false }), listController.createList)

router.put("/:id", listValidator, passport.authenticate('jwt', { session: false }), listController.editList)

router.delete("/:id", passport.authenticate('jwt', { session: false }), listController.deleteList)

module.exports = router;