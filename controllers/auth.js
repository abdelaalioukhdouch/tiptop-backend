//module.exports = (a,b) => a + b
const User = require("../models/User");

const {
  REGISTER_USER_SUCCESS,
  USER_LOGIN_SUCCESS,
  INVALID_EMAIL_PASSWORD,
  INVALID_EMAIL,
  INVALID_PASSWORD_EQUAL,
  USER_NOT_FOUND,
  INVALID_PASSWORD,
} = require("../constants");

const { generateHash } = require("../services/generate_hash");
const { generateToken } = require("../services/generate_token");

const {
  comparePassword,
  userExists,
  verifyPassword,
} = require("../validations");

exports.registerUser = async (req, res) => {
  try {
    const { name, firstName, email, address, password, confirm_password } =
      req.body;
    const email_lower = email.toLowerCase();
    if (!comparePassword(password, confirm_password))
      return res.status(400).json({ message: INVALID_PASSWORD_EQUAL });
    if (await userExists(email_lower)) {
      return res.status(400).json({ message: "Email Already in Use" });
    }
    const hashed_password = await generateHash(password);

    // create new user in database
    const user = new User({
      name,
      firstName,
      email,
      address,
      password: hashed_password,
    });

    await user.save();

    const token = generateToken(
      email.toLowerCase(),
      user._id.toString(),
      process.env.USER_SECRET
    );

    await res.status(201).json({
      message: REGISTER_USER_SUCCESS,
      user: { email: user.email, user },
      token,
    });
  } catch (err) {
    res.status(500).json({
      message: err.toString(),
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // find user by email it could be any for example name,address...
    const user = await User.findOne({
      email: email.toLowerCase(),
    }).select("+password");
    if (!user) return res.status(400).json({ message: INVALID_EMAIL });

    const is_equal = await verifyPassword(password, user.password);
    if (!is_equal) return res.status(400).json({ message: INVALID_PASSWORD });
    const token = generateToken(
      email.toLowerCase(),
      user._id.toString(),
      process.env.USER_SECRET || 'this-is-secret'
    );
    await res.status(200).json({
      message: USER_LOGIN_SUCCESS,
      token,
      user: user,
    });
  } catch (err) {
    res.status(403).json({
      // Login with gmail or invalid password
      error: err,
      message: "server error",
    });
  }
};
