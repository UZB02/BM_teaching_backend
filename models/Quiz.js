const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema(
  {
    category: string,
    theme: string,
    difficultly: {},
    title: string,
    ansver: string,
    question: [
      {
        title: string,
      },
    ],
    class: [{ title: String }],
    teacherID: string,
    rating: number,
  },
  {
    timestamps: true, // Bu yerda yaratilgan va yangilangan vaqtlar avtomatik qo‘shiladi
  }
);

module.exports = mongoose.model("Quiz", quizSchema);
