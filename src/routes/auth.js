const express = require("express");
const { validateSignUpData } = require("../utils/validation.js");
const bcrypt = require("bcrypt");
const User = require("../models/user.js");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  // Vallidate the User data

  validateSignUpData(req);

  // Encrpt the password

  const { firstName, lastName, emailId, age, gender, password } = req.body;
  const passwordHash = await bcrypt.hash(password, 10);
  console.log(passwordHash);

  // Creating the new user instance

  const user = new User({
    firstName,
    lastName,
    emailId,
    password: passwordHash,
    age,
    gender,
  });
  await user.save();
  res.status(201).send("User Added successfully");
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    // Email Validation

    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      return res.status(400).send("Invalid email or password");
    }

    const isPasswordMatch = await user.validatePassword(password);
    if (isPasswordMatch) {
      // Create JWT Token

      const token = await user.getJWT();

      console.log(token);

      // Add JWT to cookie

      res.cookie("token", token);
      res.status(200).send("Login Successful");
    } else {
      res.status(400).send("Invalid email or password");
    }
  } catch (error) {
    res.status(500).send("Error in login:" + error.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, { expires: new Date(Date.now()) });
  res.send("Logout Successfully !!!!!");
});

module.exports = authRouter;
