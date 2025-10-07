const User = require("../models/user.js");
const jwt = require("jsonwebtoken");

const userAuth = async (req, res, next) => {
  try {
    const cookies = req.cookies;
    const { token } = cookies;

    if (!token) {
      throw new Error("Unauthorized: No token provided");
    }

    const decodedObj = await jwt.verify(token, "DevTinder@9809");
    const { _id } = decodedObj;
    const user = await User.findById(_id);

    if (!user) {
      throw new Error("User not found");
    }

    req.user = user;

    next();
  } catch (error) {
    res.status(401).send("Unauthorized: " + error.message);
  }
};

module.exports = { userAuth };
