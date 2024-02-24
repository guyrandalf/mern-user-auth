const router = require("express").Router()
router.use("/auth", require("./user"))

module.exports = router