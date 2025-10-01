const express = require("express");

const connectDB = require("./config/database.js");
const PORT = 3000;
const app = express();
const User = require("./models/user.js");

app.use(express.json());

app.post("/signup", async (req, res) => {
  console.log(req.body);
  const user = new User(req.body);

  try {
    await user.save();
    res.send("User added successfully");
  } catch (error) {
    res.status(500).send("Error in creating user:" + error.message);
  }
});

connectDB()
  .then(() => {
    console.log("Database Connected");
    app.listen(PORT, () => console.log(`Server run on port ${PORT}`));
  })
  .catch((err) => console.log(err));
