const express = require("express");
const dotenv = require("dotenv").config();

const connectDB = require("./config/db");

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/batch", require("./routes/batchRoutes"));
app.use("/api/harvest", require("./routes/harvestRoutes"));
app.use("/api/task", require("./routes/taskRoutes"));

app.listen(4040, () => {
  console.log("SproutIt server initiated");
});
