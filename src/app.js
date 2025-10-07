const express = require("express");
const validator = require("validator");
const authRouter = require("./routes/auth.js");
const profileRouter = require("./routes/profile.js");

const connectDB = require("./config/database.js");
const PORT = 3000;
const app = express();

const cookieParser = require("cookie-parser");
const { userAuth } = require("./middlewares/auth.js");

app.use(cookieParser());
app.use(express.json());

app.use("/", authRouter);
app.use("/", profileRouter);

app.post("/sendConnectionRequest", userAuth, async (req, res) => {
  console.log("Sending connection request");
  res.send("Connection request sent");
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
