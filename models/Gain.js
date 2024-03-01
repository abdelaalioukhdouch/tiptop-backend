const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gainSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  ticket: {
    type: Schema.Types.ObjectId,
    ref: 'Ticket',
    required: false
  },
  email: {
    type: String,
    required: false // Set to false if not required
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
    required: false // Set to true if the ticket's title is required
  },
  toValidate: {
    type: Boolean,
    default: true // or true, depending on what your default state should be
  }
});

module.exports = mongoose.model("Gain", gainSchema);
