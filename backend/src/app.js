var express = require("express");
var cors = require("cors");
var authRoutes = require("./routes/auth.routes");
var searchRoutes = require("./routes/search.routes");
var petRoutes = require("./routes/pets.routes");
var bookingRoutes = require("./routes/booking.routes");
const prisma = require("../src/config/prisma");

var app = express();
const PORT = 3000;

app.listen(PORT, (error) => {
  if (!error)
    console.log(
      "Server is Successfully Running, " +
        "and App is listening on port " +
        PORT,
    );
  else console.log("Error occurred, server can't start", error);
});

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/search", searchRoutes);
app.use("/pets", petRoutes);
app.use("/bookings", bookingRoutes);

app.use(function (err, req, res, next) {
  console.error("Backend Error:", err.message);

  res.status(err.status || 500).json({
    message: err.message,
    error: req.app.get("env") === "development" ? err : {},
  });
});

process.on("SIGINT", async () => {
  console.log("Shutting down gracefully...");
  await prisma.$disconnect();
  console.log("Prisma disconnected.");
  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log("Server restarting...");
  await prisma.$disconnect();
  console.log("Prisma disconnected.");
  process.exit(0);
});

module.exports = app;
