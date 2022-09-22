const express = require("express");

const { list, add, findOneAndUpdate, deleteRecord } = require("../../../controllers/user");

const router = express.Router();

//  USER ROUTES
router.get("/", list);
router.post("/", add);

router.put("/:id", findOneAndUpdate)
router.delete("/:id", deleteRecord)

module.exports = router;