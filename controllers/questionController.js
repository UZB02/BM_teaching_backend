const Question = require("../models/Question");

// Savol yaratish
const createQuestion = async (req, res) => {
  try {
    const { text, subject, difficulty, points, admin, answer } = req.body;

    const question = await Question.create({
      text,
      subject,
      difficulty,
      points,
      admin,
      answer,
    });

    // adminning name va lastname qiymatlarini qo‘shish uchun
    const populatedQuestion = await Question.findById(question._id).populate(
      "admin",
      "name lastname"
    );

    res.status(201).json(populatedQuestion);
  } catch (error) {
    res.status(500).json({
      message: "Savol yaratishda xatolik yuz berdi",
      error: error.message,
    });
  }
};

// Barcha savollarni olish
const getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find().populate("admin", "name lastname");
    res.status(200).json(questions);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Savollarni olishda xatolik", error: error.message });
  }
};

// Savolni ID orqali olish

const getQuestionById =async (req,res)=>{
  try{
    const questionId = req.params.id;
    const question = await Question.findById(questionId);

    if (!question) {
      return res.status(404).json({ message: "Savol topilmadi" });
    }
    res.status(200).json(question); // savol topildi
  }catch(err){
   res
     .status(500)
     .json({ message: "Savolni olishda server xatosi", error: err.message });
  }
}

// Savolni yangilash (edit)
const updateQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const { text, subject, difficulty, points, admin } = req.body;

    const updatedQuestion = await Question.findByIdAndUpdate(
      id,
      { text, subject, difficulty, points, admin },
      { new: true, runValidators: true }
    ).populate("admin", "name lastname");

    if (!updatedQuestion) {
      return res.status(404).json({ message: "Savol topilmadi" });
    }

    res.status(200).json(updatedQuestion);
  } catch (error) {
    res.status(500).json({
      message: "Savolni yangilashda xatolik yuz berdi",
      error: error.message,
    });
  }
};

// Savolni o'chirish (delete)
const deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedQuestion = await Question.findByIdAndDelete(id);

    if (!deletedQuestion) {
      return res.status(404).json({ message: "Savol topilmadi" });
    }

    res.status(200).json({ message: "Savol muvaffaqiyatli o'chirildi" });
  } catch (error) {
    res.status(500).json({
      message: "Savolni o'chirishda xatolik yuz berdi",
      error: error.message,
    });
  }
};

module.exports = {
  createQuestion,
  getAllQuestions,
  updateQuestion,
  deleteQuestion,
  getQuestionById,
};
