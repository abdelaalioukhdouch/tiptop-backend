const bcrypt = require("bcryptjs");

const User = require("../models/User");

exports.comparePassword = (password, confirm_password) =>
  password === confirm_password;


  // find user in database by email if exist
exports.userExists = (email) => User.exists({ email: email });

exports.verifyPassword = async (password_to_comapre, password_base) =>
  await bcrypt.compare(password_to_comapre, password_base);