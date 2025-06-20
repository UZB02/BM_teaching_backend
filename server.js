const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app"); // bu yerda './server' emas, './app' bo'lishi kerak

dotenv.config();

mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log("MongoDB ulandi");
  app.listen(5000, () => console.log("Server ishga tushdi: 5000-portda"));
});
