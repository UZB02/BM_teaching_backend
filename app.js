const express = require("express");
const cors = require("cors"); // <-- BU YERDA cors ni chaqirish shart!
const app = express();

const questionRoutes = require("./routes/questionRoutes");
const adminRoutes = require("./routes/adminRoutes");

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/questions", questionRoutes);
app.use("/api/admin", adminRoutes);

module.exports = app;
