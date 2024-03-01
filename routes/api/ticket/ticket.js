const express = require("express");

const { consumeTicket, getTicketCodes, list, add, deleteRecord, findOneAndUpdate } = require("../../../controllers/ticket");
const authMiddleware = require('../../../middleware/authMiddleware');

const router = express.Router();

router.use(authMiddleware);


//  USER ROUTES
router.get("/consume", authMiddleware, consumeTicket);
router.get("/get-codes", getTicketCodes);

// Crud routes
router.get("/", list);
router.post("/", add);

router.put("/:id", findOneAndUpdate)
router.delete("/:id", deleteRecord)

module.exports = router;