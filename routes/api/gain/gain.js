// routes/gain.js

const express = require('express');
const router = express.Router();
const gainController = require('../../../controllers/gain'); // Import your gain controller

// Define a route to get all gains
router.get('/', gainController.getAllGains);

module.exports = router;
