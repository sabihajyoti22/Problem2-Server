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
const ticketSchema = require("../Model/ticket.model");
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tickets = yield ticketSchema.find();
    res.status(200).json(tickets);
});
let tickets = [];
let last = null;
const createTicket = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        tickets = yield ticketSchema.find();
    }
    catch (error) {
        res.status(500).send(error.message);
    }
    if (tickets.length) {
        last = tickets[tickets.length - 1];
        console.log(last.date);
    }
    else {
        try {
            const newUser = ticketSchema({
                userID: req.body.username,
                useremail: req.body.useremail,
            });
            yield newUser.save();
            res.status(201).json(newUser);
        }
        catch (error) {
            res.status(500).send(error.message);
        }
    }
});
module.exports = { getAll, createTicket };
