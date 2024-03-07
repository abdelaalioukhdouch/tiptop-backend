const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ticketSchema = new Schema(
  {
    code: {
      type: Number,
    },
    title: {
      type: String,
    },
    isClaimed: Boolean,
    isActive: Boolean,
  },
  { timestamps: true }
);

ticketSchema.index({ "$**": "text" });
module.exports = mongoose.model("Ticket", ticketSchema);