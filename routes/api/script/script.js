const express = require("express");

const { addTickets } = require("../../../controllers/script");

const router = express.Router();

//  USER ROUTES
router.post("/add-tickets", addTickets);

module.exports = router;