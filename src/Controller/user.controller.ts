const userSchema = require("../Model/user.model")
const bcrypt = require("bcrypt")
const saltRounds = 10

const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

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

                const msg = {
                    to: req.body.email, // Change to your recipient
                    from: 'sabihajyoti@sayburgh.com', // Change to your verified sender
                    subject: 'Please verify your email address',
                    text: 'Below a link is provided to verify your email address',
                    html: '<a href="http://localhost:5173/activate">http://localhost:5173/activate</a>',
                }

                sgMail.send(msg)
                // .then((response: any) => {
                //     console.log(response[0].statusCode)
                //     console.log(response[0].headers)
                // })
                // .catch((error: any) => {
                //     console.error(error)
                // })
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