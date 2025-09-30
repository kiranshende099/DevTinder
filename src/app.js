const express = require("express");

const app = express();

app.use(
  "/user",
  [
    (req, res, next) => {
      console.log("1st Route");
      next();
      res.send("1st Route");
    },
    (req, res, next) => {
      console.log("2nd Route");

      // res.send("2nd Route");
      next();
    },
  ],
  (req, res, next) => {
    console.log("3nd Route");
    next();
    res.send("3nd Route");
  },
  (req, res, next) => {
    console.log("4nd Route");
    next();
    res.send("4nd Route");
  },
  (req, res, next) => {
    console.log("5nd Route");
    next();
    res.send("5nd Route");
  }
);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server run on port ${PORT}`));
