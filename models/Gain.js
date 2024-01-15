const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gainSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  ticket: {
    type: Schema.Types.ObjectId,
    ref: 'Ticket',
    required: true
  },
  claimedAt: {
    type: Date,
    default: Date.now
  }
  // Autres champs si nécessaire
});

module.exports = mongoose.model("Gain", gainSchema);
