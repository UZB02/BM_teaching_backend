const express = require("express");
const cors = require("cors");
const app = express();

const questionRoutes = require("./routes/questionRoutes");
const adminRoutes = require("./routes/adminRoutes");

app.use(express.json());

// CORS ni barcha domenlar uchun, credentials bilan ruxsat berish
app.use(
  cors({
    origin: (origin, callback) => {
      callback(null, origin); // barcha originlarga ruxsat beradi
    },
    credentials: true,
  })
);

// Routerlar
app.use("/api/questions", questionRoutes);
app.use("/api/admin", adminRoutes);

module.exports = app;
