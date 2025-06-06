// server.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");

dotenv.config();
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

  // mongoose
  //   .connect(process.env.MONGO_URI, {
  //     useNewUrlParser: true,
  //     useUnifiedTopology: true,
  //   })
  //   .then(() => console.log("MongoDB connected"))
  //   .catch((err) => console.error(err));