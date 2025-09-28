const express = require("express");

const app = express();

// app.use((req, res) => {
//   res.send("Server Started 134");
// });
app.use("/hello", (req, res) => {
  res.send("Hello from server");
});
app.use("/test", (req, res) => {
  res.send("testing");
});

app.listen(7777, () => console.log(`Server run on port 7777`));
