const express = require("express");

const app = express();

const { adminAuth, userAuth } = require("./middlewares/auth");

app.use("/admin", adminAuth);

app.get("/admin/getAllData", (req, res) => {
  res.send("Admin data posted successfully");
});

app.get("/user/getAllData", userAuth, (req, res) => {
  res.send("Here is all the user data");
});

app.post("/user/login", (req, res) => {
  res.send("User logged in successfully");
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server run on port ${PORT}`));
