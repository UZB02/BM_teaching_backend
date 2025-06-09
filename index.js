const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();

const questionRoutes = require("./routes/questionRoutes");
const adminRoutes = require("./routes/adminRoutes");
dotenv.config();
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

mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log("MongoDB ulandi");
  app.listen(5000, () => console.log("Server ishga tushdi: 5000-portda"));
});

module.exports = app;
