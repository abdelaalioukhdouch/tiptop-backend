// controllers/gain.js

const Gain = require('../models/Gain'); // Import your Gain model


    module.exports = {
        getAllGains: async (req, res) => {
          try {
            const gains = await Gain.find();
            console.log('Retrieved gains:', gains); // Add this line
            res.status(200).json(gains);
          } catch (error) {
            console.error('Error fetching gains:', error);
            res.status(500).json({ message: 'Internal server error' });
          }
        },
        // Other controller methods if needed
      };
