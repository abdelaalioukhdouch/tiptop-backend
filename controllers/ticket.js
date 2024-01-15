const Ticket = require("../models/Ticket");
const Gain = require("../models/Gain");

const { TICKET_NOT_FOUND, TICKET_ALREADY_USED } = require("../constants");

module.exports = {

  

  consumeTicket: async (req, res) => {
    try {
      const { code } = req.query;
      let ticket = await Ticket.findOne({ code });
      if (!ticket) {
        return res.status(400).json({ message: TICKET_NOT_FOUND });
      }
      if (ticket.isClaimed) {
        console.log('user :', 'user.user._id');
        return res.status(400).json({ message: TICKET_ALREADY_USED });
      }
  
      ticket.isClaimed = true;
      ticket.isActive = false;
      await ticket.save();

      // Vérifier si l'ID de l'utilisateur est présent
      // if (!req.user || !req.user._id) {
      //   return res.status(400).json({ message: "User ID not found" });
      // }
      
      try {
        const newGain = new Gain({
          //user: req.user._id,  // Utiliser l'ID de l'utilisateur actuel
          ticket: ticket._id
        });
        await newGain.save();
        res.status(200).json({
          message: `Congratulations You got ${ticket.title}`,
          ticket,
          gain: newGain
        });
      } catch (err) {
        console.error("Error saving gain:", err);
      }
    } catch (err) {
      console.error("Error in consumeTicket:", err);
      res.status(500).json({ message: err.toString() });
    }
  },

  // ... autres méthodes ...


  getTicketCodes: async (req, res) => {
    try {
      const tickets = await Ticket.find(
        {},
        { code: 1, isClaimed: 1, title: 1, "_id": 0 }
      ).lean();
      res.status(200).send(tickets);
    } catch (err) {
      res.status(500).json({
        message: err.toString(),
      });
    }
  },
  // Retrieve and return from the database.
  list: async (req, res, next) => {
    let query = {};
    if (req.query.name) {
      query['name'] = new RegExp(req.query.name, "i");
    }
    if (req.query.q) {
      query['$or'] = [
        { title: new RegExp(req.query.q, "i") },
      ]
      try {
        let code = parseInt(req.query.q);
        query['$or'].push({
          "$where": `function() { return this.code.toString().match(/${code}/gi) != null; }`
        });
      } catch (err) { }
    }
    if (req.query.ids) {
      if (req.query.ids != "all") {
        query['_id'] = { $in: req.query.ids.split(",") };
      }
      let projection = {};
      if (req.query.fields) {
        req.query.fields.split(",").forEach(field => {
          projection[field] = 1;
        })
      }
      let records = Ticket.find(query, projection);
      return res.send(await records);
    } else {
      let perPage = req.query.perPage || 20,
        page = Math.max(0, (req.query.page || 1)),
        count = await Ticket.count();
      try { perPage = parseInt(perPage) } catch (err) { }
      /* This is to automate query criterial */
      // delete req.query.perPage;
      // delete req.query.page;
      // delete req.query.apikey;
      Object.keys(req.query).forEach(key => {
        if (Ticket.schema.path(key)) {
          query[key] = new RegExp(req.query[key], "i");
        }
      })
      //////////////////////////////////////////
      Ticket.find(query)
        .limit(perPage)
        .skip(perPage * (page - 1))
        .then(async response => {
          let data = { perPage, page, count, pages: Math.ceil(count / perPage), data: response, };
          res.send(data);
        }).catch(err => {
          res.status(500).send({
            message: "Failed! No personal information found."
          });
        });
    }
  },

  // Retrieve and return from the database.
  findOne: async (req, res, next) => {
    try {
      let response = await Ticket.findById({ _id: req.params.id }).select('+password');
      if (response) {
        res.send(response);
      } else {
        return res.status(500).send({
          message: "Failed! No personal information found."
        });
      }
    } catch (err) {
      return res.status(500).send({
        message: "Failed! No personal information found."
      });
    }
  },

  // Add a personal database.
  add: async (req, res, next) => {

    try {
      let newRecord = new Ticket(req.body);
      let response = await newRecord.save();
      res.send(response);
    } catch (err) {
      let message = "Failed! record cannot be added!";
      if (err.message.indexOf("duplicate")) message = `This record already exists`;
      res.status(406).send({
        message,
        err
      });
    }
  },

  findOneAndUpdate: async (req, res, next) => {

    delete req.body._id;
    let found = await Ticket.findById(req.params.id);
    if (found) {
      let updated = await found.update({ $set: req.body });
      return res.send(await Ticket.findById(req.params.id));
    } else {
      res.status(500).send({
        message: "Failed! not found to be updated"
      });
    }

  },

  // Remove personal information from database.
  deleteRecord: async (req, res, next) => {
    let record = await Ticket.findById(req.params.id);
    if (record) {
      try { res.send(await record.remove()); } catch (err) { next(err); }
    } else {
      res.status(404).send({
        message: "Failed! The record doesn't found"
      });
    }
  }
}