const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const scheduler = require("./services/schedule");
const { createServer } = require("http");
const { Server } = require("socket.io");

const { errorHandler } = require("./middleware/errorMiddleware");

const app = express();

const port = process.env.PORT || 4040;

const appServer = createServer(app);
const io = new Server(appServer, {
  cors: {
    origin: "*",
  },
});

global.io = io;

const connectDB = require("./config/db");
const { DateTime } = require("luxon");
connectDB();

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
app.use("/api/notif", require("./routes/notificationRoutes"));

app.use(errorHandler);

io.on("connection", (socket) => {
  console.log("connected");

  socket.on("disconnect", () => {
    console.log("disconnected");
  });
});

appServer.listen(port, () => {
  console.log("SproutIt appServer initiated at port " + port);
});

// reschedule existing tasks after appServer is initiated
(async () => {
  await scheduler.reSchedule();
})();

console.log("epoch", new Date().toString());
console.log("current", new Date().toISOString());
