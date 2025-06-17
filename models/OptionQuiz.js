const mongoose = require("mongoose");

const optionquestionSchema = new mongoose.Schema(
  {
    text: String, // Savol matni
    subject: String, // Fan nomi
    difficulty: String, // Qiyinchilik darajasi
    points: Number, // Ball
    options: [String], // Variantlar (masalan: ["A", "B", "C", "D"])
    correctAnswer: String, // To‘g‘ri javob (masalan: "B")
    admin: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("OptionQuestion", optionquestionSchema);
