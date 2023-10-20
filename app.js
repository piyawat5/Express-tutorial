const express = require("express");
const app = express();

//Middlewares
app.use(express.json());

app.use(require("./src/routes/routes"));

const port = 3000;
app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
  console.log("Press ctrl + c to quit.");
});
