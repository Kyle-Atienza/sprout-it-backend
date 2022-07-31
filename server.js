const express = require("express");
const dotenv = require("dotenv").config();

const connectDB = require("./config/db");

connectDB();

const app = express();

app.listen(4040, () => {
  console.log("SproutIt server initiated");
});
