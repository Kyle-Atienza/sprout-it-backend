const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");

const { errorHandler } = require("./middleware/errorMiddleware");

const port = 4040;

const connectDB = require("./config/db");

connectDB();

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/batch", require("./routes/batchRoutes"));
app.use("/api/harvest", require("./routes/harvestRoutes"));
app.use("/api/task", require("./routes/taskRoutes"));
app.use("/api/material", require("./routes/materialRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/farm", require("./routes/farmRoutes"));
// Subscribe Route
app.post("/subscribe", (req, res) => {
  // Get pushSubscription object
  const subscription = req.body;

  // Send 201 - resource created
  res.status(201).json({});

  // Create payload
  const payload = JSON.stringify({ title: "Push Test" });

  // Pass object into sendNotification
  webpush
    .sendNotification(subscription, payload)
    .catch((err) => console.error(err));
});

app.use(errorHandler);

app.listen(port, () => {
  console.log("SproutIt server initiated at port " + port);
});
