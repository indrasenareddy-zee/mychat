var express = require("express")
var router = express.Router()
var {connectToFriend,dashboard,openChat} = require("../controllers/userController")

router.get("/dashboard",dashboard)

router.post("/connect",connectToFriend)
router.get("/openchat/:friendId",openChat)

module.exports = router
