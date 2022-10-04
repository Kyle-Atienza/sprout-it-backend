const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const scheduler = require("./services/schedule");

const { errorHandler } = require("./middleware/errorMiddleware");

const port = 4040;

const connectDB = require("./config/db");

connectDB();

const app = express();

app.use(
  cors({
    origin: "*",
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
app.use("/api/purchase", require("./routes/purchaseRoutes"));
app.use("/api/supplier", require("./routes/supplierRoutes"));

app.use(errorHandler);

app.listen(port, () => {
  console.log("SproutIt server initiated at port " + port);
});

// reschedule existing tasks after server is initiated
(async () => {
  await scheduler.reSchedule();
})();
