const express = require("express");
const app = express();

app.get("/say", function (req, res) {
  res.send("Hello World");
});

app.get("/user/:id", function (req, res) {
  res.send(`hello ${req.params.name}`);
});

app.get("/search", function (req, res) {
  res.send(`search: ${req.query.name} ${req.query.id}`);
});

const port = 3000;
app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
  console.log("Press ctrl + c to quit.");
});
