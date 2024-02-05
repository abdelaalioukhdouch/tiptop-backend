const express = require('express');
const router = express.Router();
const { selectWinner } = require('../../../controllers/winnerController');

router.get('/', selectWinner);

module.exports = router;
