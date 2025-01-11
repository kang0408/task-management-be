const express = require("express");
require("dotenv").config();

// Kết nối với database
const database = require("./config/database.js");
database.connect();

const routes = require("./api/v1/routes/index.routes.js");

const app = express();
// Lấy port từ biến môi trường
const port = 3000;

routes(app);

// Nghe port
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
