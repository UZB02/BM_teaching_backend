const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    text: String,
    subject: String,
    difficulty: String,
    points: Number,
    answer: String,
    admin: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
  },
  {
    timestamps: true, // Bu yerda yaratilgan va yangilangan vaqtlar avtomatik qo‘shiladi
  }
);

module.exports = mongoose.model("Question", questionSchema);
