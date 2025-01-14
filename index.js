const express = require("express");
const cors = require("cors"); // CORS
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
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
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors);

routes(app);

// Nghe port
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
