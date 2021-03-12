var express = require("express")
var router = express.Router()
var {newUser,login} = require("../controllers/userController")
router.post("/welcome",newUser)
router.post("/dashboard",login)

module.exports = router
