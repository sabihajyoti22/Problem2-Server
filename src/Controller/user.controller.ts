const userSchema = require("../Model/user.model")
const bcrypt = require("bcrypt")
const saltRounds = 10

const signUp = async (req: any, res: any) => {
    try {
        const user = await userSchema.findOne({ email: req.body.email })
        if (user) {
            res.status(409).json({ message: "User already exists, Try to signin", data: user })
        } else {
            bcrypt.hash(req.body.password, saltRounds, async function (err: any, hash: any) {
                const newUser = userSchema({
                    email: req.body.email,
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    mobile: req.body.mobile,
                    password: hash
                })
                await newUser.save()
                res.status(200).json(newUser)
            })
        }
    } catch (error: any) {
        res.status(500).send(error.message)
    }
}

const signIn = async (req: any, res: any) => {
    try {
        const { _id, password } = req.body
        if (_id.length !== 24) {
            res.status(401).send({ message: "Not a valid user id" })
        } else {
            const loginData = await userSchema.findOne({ _id: _id })
            if (loginData) {
                if (loginData.activate) {
                    bcrypt.compare(password, loginData.password, function (err: any, result: any) {
                        if (result) {
                            res.status(200).json(loginData)
                        }
                        else {
                            res.status(401).send({ message: "Credentials didn't match" })
                        }
                    })
                } else {
                    res.status(401).send({ message: "Your account hasn't activated yet" })
                }
            }
            else {
                res.status(404).send({ message: "User not found" })
            }
        }

    } catch (error: any) {
        res.status(500).send(error.message)
    }
}

const activateAccount = async (req: any, res: any) => {
    try {
        const user = await userSchema.findOne({ email: req.body.email })
        user.activate = true
        await user.save()
        res.status(200).json(user)
    } catch (error: any) {
        res.status(500).send(error.message)
    }
}

module.exports = { signUp, signIn, activateAccount }