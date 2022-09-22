const User = require("../models/User");

exports.findUserByEmail = async (email) => await User.findOne({ email });

exports.findUserById = async (id) => await User.findById(id);