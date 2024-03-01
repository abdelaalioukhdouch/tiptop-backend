// routes/gain.js

const express = require('express');
const router = express.Router();
const gainController = require('../../../controllers/gain'); // Import your gain controller
const authMiddleware = require('../../../middleware/authMiddleware');


router.use(authMiddleware);


// Define a route to get all gains
router.get('/', gainController.getAllGains);
// Delete a gain
router.delete('/:id', gainController.deleteGain);
router.put('/:id', gainController.updateGain);



module.exports = router;
