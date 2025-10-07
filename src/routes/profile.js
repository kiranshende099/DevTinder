const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth.js");
const { validateEditProfileData } = require("../utils/validation.js");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (error) {
    res.status(500).send("Error in fetching profile:" + error.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid edit request");
    }

    const loggedInUser = req.user;
    console.log(loggedInUser);

    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    console.log(loggedInUser);

    await loggedInUser.save();

    res.send(
      `${loggedInUser.firstName}, your profile is updated successfully!!!`
    );
  } catch (error) {
    res.status(400).send("ERROR :" + error.message);
  }
});

profileRouter.patch("/profile/password", userAuth, async (req, res) => {});

module.exports = profileRouter;
