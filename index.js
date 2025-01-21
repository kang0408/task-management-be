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

// parse application/json
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());

routes(app);

// Nghe port
app.listen(3000, () => {
  console.log(`App listening on port 3000`);
});
