const ticketSchema = require("../Model/ticket.model")

const getAll = async (req, res) => {
    const tickets = await ticketSchema.find()
    res.status(200).json(tickets)
}

let tickets: any[] = []
let last = null

const createTicket = async (req: any, res: any) => {
    try {
        tickets = await ticketSchema.find()
    } catch (error: any) {
        res.status(500).send(error.message)
    }

    if (tickets.length) {
        last = tickets[tickets.length - 1]
        console.log(last.date)
    } else {
        try {
            const newUser = ticketSchema({
                userID: req.body.username,
                useremail: req.body.useremail,
            })
            await newUser.save()
            res.status(201).json(newUser)
        } catch (error: any) {
            res.status(500).send(error.message)
        }
    }
}

module.exports = { getAll, createTicket }