const express = require("express");
const cors = require("cors");
const app = express();

const optionQuizRoutes =require("./routes/optionQuizRoutes")
const questionRoutes = require("./routes/questionRoutes");
const adminRoutes = require("./routes/adminRoutes");

app.use(express.json());

// Barcha domenlarga ruxsat berish (credentials bo'lmasa)
app.use(cors());

// OPTIONS so'rovlariga ham ruxsat
app.options("*", cors());

// Routerlar
app.use("/api/optionquizs", optionQuizRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/admin", adminRoutes);

module.exports = app;
