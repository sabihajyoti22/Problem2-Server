const express = require("express")
const { signUp, signIn, activateAccount, sendMail } = require("../Controller/user.controller")
const router = express.Router()

router.post("/signup", signUp)
router.post("/signin", signIn)
router.post("/activate", activateAccount)
router.post("/sendmail", sendMail)

module.exports = router