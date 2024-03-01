const jwt = require('jsonwebtoken');
const secret = process.env.USER_SECRET; // Ensure you have your secret key set in environment variables

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Log the authorization header to debug
  //console.log('Authorization Header:', authHeader);

  if (!authHeader) {
    return res.status(401).json({ message: "Authentication failed! No token provided." });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Authentication failed! Incorrect token format." });
  }

  try {
    const decodedToken = jwt.verify(token, secret);
    req.user = { email: decodedToken.email, userId: decodedToken.userId };
    next();
  } catch (error) {
    // Log the error for debugging
    console.error('Error verifying JWT token:', error);
    res.status(401).json({ message: "Authentication failed!" });
  }
};
