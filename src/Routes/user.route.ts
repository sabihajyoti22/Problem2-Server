const express = require("express")
const { signUp, signIn, activateAccount } = require("../Controller/user.controller")
const router = express.Router()

router.post("/signup", signUp)
router.post("/signin", signIn)
router.post("/activate", activateAccount)

module.exports = router