const User = require("../models/SignupModel"); // Import the User model, make sure the path is correct
require("dotenv").config(); // Load environment variables from a .env file
const jwt = require("jsonwebtoken"); // Import jwt library for token verification

// Function for user verification based on a token stored in cookies
module.exports.userVerification = (req, res) => {
  const token = req.cookies.token; // Retrieve the token from the request's cookies

  if (!token) {
     // If no token is found in cookies, return a response indicating unauthenticated status
    return res.json({ status: false });
  }
    // Verify the token using the TOKEN_KEY from environment variables
  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
      // If token verification fails (e.g., expired or invalid token), return unauthenticated status
      return res.json({ status: false });
    } else {
      // If token is valid, retrieve user data based on the user's ID stored in the token
      const user = await User.findById(data.id);

      if (user) {
        // If a user is found, return authenticated status along with the user's username
        return res.json({ status: true, user: user.username });
      } else {
        // If no user is found, return unauthenticated status
        return res.json({ status: false });
      }
    }
  });
};
