const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

// Kết nối với database
const database = require("./config/database.js");
database.connect();

// Routes
const routes = require("./api/v1/routes/index.routes.js");

const app = express();
// Lấy port từ biến môi trường
const port = 3000;

// parse application/json
app.use(bodyParser.json());

routes(app);

// Nghe port
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
