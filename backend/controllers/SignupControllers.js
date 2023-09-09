const User = require("../models/SignupModel"); // Import the User model, make sure the path is correct
const mongoose = require("mongoose"); // Import mongoose for MongoDB interactions
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing
const jwt = require("jsonwebtoken"); // Import jwt library for token generation and validation
require("dotenv").config(); // Load environment variables
const CONFIG = require("../config/config"); // Import your configuration

// POST route for user signup
module.exports.signup = async (req, res) => {
  const { username, email, password, fullname, gender, dob, createdby } = req.body; // Extract user data from the request body

  // Check if an existing user with the same email exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    console.log("THIS EMAIL ALREADY EXISTS");
    return res.status(400).json({ Error: "THIS EMAIL ALREADY EXISTS" });
  }

  // Validation checks for various user data fields
  const errors = {};
  if (!username) {
    errors.username = "USERNAME IS REQUIRED";
  } else if (!/^[a-zA-Z\s]+$/.test(username)) {
    errors.username = "USERNAME SHOULD CONTAIN ONLY ALPHABETS AND SPACES";
  }

  // Similar validation checks for email, password, fullname, dob, and others

  // If there are validation errors, return a 400 response with error details
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  try {
    // Hash the user's password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the number of salt rounds

    // Create a new user object with hashed password
    const newUser = {
      username,
      email,
      password: hashedPassword,
      fullname,
      dob,
      gender,
      createdby: "self",
    };

    // Create the user in the database
    const result = await User.create(newUser);

    // Generate a JWT token for user authentication
    const expiration_time = parseInt(CONFIG.jwt_expiration);
    const token = jwt.sign({ newUser }, CONFIG.jwt_encryption, {
      expiresIn: expiration_time,
    });

    // Set the token in response cookies for client-side storage
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 3600000, // Token expiration time in milliseconds (1 hour in this case)
    });

    console.log("REGISTER USER DETAILS SUCCESSFULLY");
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ Error: "INTERNAL SERVER ERROR" });
  }
};

// GET route for retrieving all user signups
module.exports.getsignup = async (req, res) => {
  // Retrieve all users from the database
  await User
    .find({})
    .then((result) => {
      console.log("USER LOGGEDIN");
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

// GET route for retrieving a user signup by ID
module.exports.findsignup = async (req, res) => {
  const id = req.params.id;

  // Check if the provided ID is a valid MongoDB ObjectID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ Error: "YOUR DETAILS ARE NOT FOUND" });
  }
  try {
    // Find a user signup by ID in the database
    const enrolled = await User.findById(id);
    console.log("DATAIS RETURNED FOR VIEW");
    return res.json(enrolled);
  } catch (err) {
    return console.log(err);
  }
};

// DELETE route for deleting a user signup by ID
module.exports.deletesignup = async (req, res) => {
  const id = req.params.id;

  // Check if the provided ID is a valid MongoDB ObjectID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ Error: "YOUR DETAILS ARE NOT FOUND" });
  }

  try {
    // Delete a user signup by ID from the database
    const result = await User.findByIdAndDelete(id);
    if (result) {
      console.log("THE FORM IS DELETED");
      res.status(200).json({ Message: "YOUR FORM DELETED SUCCESSFULLY " });
    } else {
      console.log("YOUR FORM IS NOT FOUND");
      res.status(404).json({ Error: "YOUR FORM IS NOT FOUND" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ Error: "INTERNAL SERVER ERROR" });
  }
};
