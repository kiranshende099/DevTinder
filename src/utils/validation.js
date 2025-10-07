const validator = require("validator");

const validateSignUpData = (req, res) => {
  const { firstName, lastName, emailId, password, age } = req.body;

  if (!firstName || !lastName) {
    throw new Error("First name and last name are required");
    // res.send("First name and last name are required");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Enter valid email");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not valid");
  }
};

const validateEditProfileData = (req) => {
  const allowedEditFields = ["firstName", "lastName", "age", "gender"];

  const isEditAllowed = Object.keys(req.body).every((field) =>
    allowedEditFields.includes(field)
  );

  return isEditAllowed;
};

module.exports = { validateSignUpData, validateEditProfileData };
