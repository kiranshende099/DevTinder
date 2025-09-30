const express = require("express");

const app = express();

const { adminAuth, userAuth } = require("./middlewares/auth");

app.use("/admin/getAllData", adminAuth, (req, res) => {
  res.send("Here is all the admin data");
});

app.get("/user/getAllData", userAuth, (req, res) => {
  res.send("Here is all the user data");
});

app.post("/user/login", (req, res) => {
  res.send("User logged in successfully");
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server run on port ${PORT}`));
