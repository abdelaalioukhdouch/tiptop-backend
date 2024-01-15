const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
    },
    address: {
      type: String,
      required: false,
      default: "",
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
      select: false
    },
    role: {
      type: String,
      required: false,
      default: "",
    },
  },
  { timestamps: true }
);

userSchema.index({ "$**": "text" });

module.exports = mongoose.model("User", userSchema);
