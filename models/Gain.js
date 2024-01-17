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
  },
  userName: {
    type: String, // Assuming the user's name is a string
    required: false // Set to true if the user's name is required
  },
  ticketTitle: {
    type: String, // Assuming the ticket's title is a string
    required: true // Set to true if the ticket's title is required
  }
  // Other fields if necessary
});

module.exports = mongoose.model("Gain", gainSchema);
