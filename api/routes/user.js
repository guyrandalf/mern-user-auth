const express = require("express")
const router = express.Router()
const userController = require("../controllers/User")
const validation = require("../middlewares/validate")

router.post("/login", validation.saveUser, userController.loginUser)
router.post("/register", userController.registerUser)

module.exports = router