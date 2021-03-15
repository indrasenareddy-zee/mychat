var express = require("express")
var router = express.Router()

var {newUser,login} =  require("../controllers/authController")

router.post("/welcome",newUser)
router.post("/login",login)


module.exports = router
