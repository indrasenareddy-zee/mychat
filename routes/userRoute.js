var express = require("express")
var router = express.Router()
var {newUser} = require("../controllers/userController")
router.post("/welcome",newUser)

module.exports = router
