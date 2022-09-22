const mongoose = require("mongoose");
const MONGO_URL = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/';
const MONGO_DB = process.env.MONGO_DB || 'ProjectDS';

const connectDB = async () => {
  try {
    await mongoose.connect(`${MONGO_URL}${MONGO_DB}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    
    });
    console.log("\u001b[" + 34 + "m" + `Connected to Database` + "\u001b[0m");
  } catch (error) {
    console.error(error);
    // exit process with failure
    // process.exit(1);
  }
};
module.exports = connectDB;