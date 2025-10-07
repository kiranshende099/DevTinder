const express = require("express");
const validator = require("validator");
const bcrypt = require("bcrypt");
const { validateSignUpData } = require("./utils/validation.js");
const connectDB = require("./config/database.js");
const PORT = 3000;
const app = express();
const User = require("./models/user.js");
const cookieParser = require("cookie-parser");
const { userAuth } = require("./middlewares/auth.js");

app.use(cookieParser());
app.use(express.json());

app.post("/login", async (req, res) => {
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

app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (error) {
    res.status(500).send("Error in fetching profile:" + error.message);
  }
});

app.post("/sendConnectionRequest", userAuth, async (req, res) => {
  console.log("Sending connection request");
  res.send("Connection request sent");
});

app.post("/signup", async (req, res) => {
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

app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;

  try {
    const ALLOWED_UPDATES = ["firstName", "lastName", "age", "gender"];

    const isAllowUpdate = Object.keys(data).every((key) =>
      ALLOWED_UPDATES.includes(key)
    );

    if (!isAllowUpdate) {
      return res.status(400).send("Invalid updates!");
    } else {
      const user = await User.findByIdAndUpdate({ _id: userId }, data, {
        returnDocument: "after",
        runValidators: true,
      });

      console.log(user);

      res.status(201).send("User updated successfully");
    }
  } catch (error) {
    res.status(500).send("Error in updating user:" + error.message);
  }
});

connectDB()
  .then(() => {
    console.log("Database Connected");
    app.listen(PORT, () => console.log(`Server run on port ${PORT}`));
  })
  .catch((err) => console.log(err));
