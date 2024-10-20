const ticketSchema = require("../Model/ticket.model")

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
        let currMin = new Date().getTime() / 60000
        let lastMin = new Date(last.date).getTime() / 60000
        if (Math.floor(currMin - lastMin) <= 30) {
            res.status(409).json({ "message": "You have already placed a support ticket. Please wait at least one hour before sending another request" })
        } else {
            try {
                const newUser = ticketSchema({
                    userID: req.body.userID,
                    deviceID: req.body.deviceID,
                    queryText: req.body.queryText
                })
                await newUser.save()
                res.status(201).json({ "data": { _id: newUser._id } })
            } catch (error: any) {
                res.status(500).send(error.message)
            }
        }
    } else {
        try {
            const newUser = ticketSchema({
                userID: req.body.userID,
                deviceID: req.body.deviceID,
                queryText: req.body.queryText
            })
            await newUser.save()
            res.status(201).json({ "data": { _id: newUser._id } })
        } catch (error: any) {
            res.status(500).send(error.message)
        }
    }
}

module.exports = { createTicket }