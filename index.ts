import express from "express";
const app = express();

import dotenv from "dotenv";
dotenv.config();

const cors = require("cors")
app.use(cors());

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const cookieParser = require("cookie-parser");
app.use(cookieParser());

import database from "./configs/database.config";
database.connect();

// Routes
import routesV1 from "./api/v1/routes";
routesV1(app);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});