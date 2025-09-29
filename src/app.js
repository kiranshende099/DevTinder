const express = require("express");

const app = express();

app.get("/user", (req, res) => {
  res.send({ firstName: "Kiran", lastName: "Shende" });
});

app.post("/user", (req, res) => {
  res.send("Data added successfully");
  console.log("Data added successfully");
});

app.put("/user", (req, res) => {
  res.send("Data updated successfully");
  console.log("Data added successfully");
});

app.patch("/user", (req, res) => {
  res.send("Data partially updated successfully");
  console.log("Data added successfully");
});

app.delete("/user", (req, res) => {
  res.send("Data removed successfully");
  console.log("Data removed successfully");
});

const PORT = 3000;

app.listen(PORT, () => console.log(`Server run on port ${PORT}`));
