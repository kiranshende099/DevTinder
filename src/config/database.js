const mongoose = require("mongoose");
const URI =
  "mongodb+srv://kiranshende099:Mongodb%40099@namastenode.k903one.mongodb.net/devTinder";

const connectDB = async () => {
  await mongoose.connect(URI);
};

module.exports = connectDB;
