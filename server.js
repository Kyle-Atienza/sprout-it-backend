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

const date = new Date("2022-11-11");
console.log("debug", new Date("10-26-2022 8:00").toString());
console.log(
  "debug",
  new Date(
    new Date("10-26-2022 8:00").toLocaleString("en-US", {
      timeZone: "Asia/Manila",
    })
  ).toString()
);
