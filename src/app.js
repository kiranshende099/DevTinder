const express = require("express");

const connectDB = require("./config/database.js");
const PORT = 3000;
const app = express();
const User = require("./models/user.js");

app.use(express.json());

app.post("/user", async (req, res) => {
  const data = req.body;

  try {
    const user = new User(data);
    console.log(user);
    await user.save();

    res.status(201).send("User updated successfully");
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
