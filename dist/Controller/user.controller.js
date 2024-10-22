"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const userSchema = require("../Model/user.model");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userSchema.findOne({ email: req.body.email });
        if (user) {
            res.status(409).json({ message: "User already exists, Try to signin", data: user });
        }
        else {
            bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
                return __awaiter(this, void 0, void 0, function* () {
                    const newUser = userSchema({
                        email: req.body.email,
                        firstname: req.body.firstname,
                        lastname: req.body.lastname,
                        mobile: req.body.mobile,
                        password: hash
                    });
                    yield newUser.save();
                    res.status(200).json(newUser);
                    const msg = {
                        to: req.body.email,
                        from: 'sabihajyoti@sayburgh.com',
                        subject: 'Please verify your email address',
                        text: 'Below a link is provided to verify your email address',
                        html: `You can activate your acount through this link: <a href="${process.env.FRONTEND_URL}/activate/${newUser._id}">${process.env.FRONTEND_URL}/activate/${newUser._id}</a>`,
                    };
                    sgMail.send(msg).then((res) => {
                        console.log('Success');
                    }).catch((err) => {
                        console.log(err);
                    });
                });
            });
        }
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id, password } = req.body;
        if (_id.length !== 24) {
            res.status(401).send({ message: "Not a valid user id" });
        }
        else {
            const loginData = yield userSchema.findOne({ _id: _id });
            if (loginData) {
                if (loginData.activate) {
                    bcrypt.compare(password, loginData.password, function (err, result) {
                        result ? res.status(200).json(loginData) : res.status(401).send({ message: "Credentials didn't match" });
                    });
                }
                else {
                    res.status(401).send({ message: "Your account hasn't activated yet" });
                }
            }
            else {
                res.status(404).send({ message: "User not found" });
            }
        }
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
const activateAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userSchema.findOne({ _id: req.body._id });
        if (!user.activate) {
            user.activate = true;
            yield user.save();
        }
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
module.exports = { signUp, signIn, activateAccount };
