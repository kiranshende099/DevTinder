const adminAuth = (req, res, next) => {
  console.log("Admin auth is getting checked");
  const token = "xyz";
  const isAdminAuthorised = token === "xyz";
  if (!isAdminAuthorised) {
    return res.status(403).send("Admin not authorised");
  } else {
    next();
  }
};
const userAuth = (req, res, next) => {
  console.log("User auth is getting checked");
  const token = "xyz";
  const isUserAuthorised = token === "xyzjhgfd";
  if (!isUserAuthorised) {
    return res.status(403).send("User not authorised");
  } else {
    next();
  }
};

module.exports = { adminAuth, userAuth };
