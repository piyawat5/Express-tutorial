const express = require("express");
const app = express();
const cors = require("cors");
// if (env !== "production") {
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./src/configs/swagger");
// }

//Middlewares
app.use(express.json());
app.use("/image", express.static("./images"));

//CORS
// const corsOptions = {
//   origin: [
//     "http://example.com",
//     "http://localhost:3000",
//     "https://www.w3schools.com",
//   ],
//   optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
// };
app.use(cors());

//Routes api
app.use(require("./src/routes/routes"));

//swagger
app.use("/swagger-ui", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//port
const port = 3000;
app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
  console.log("Press ctrl + c to quit.");
});
