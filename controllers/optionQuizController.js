const OptionQuiz = require("../models/OptionQuiz");

// Yangi savol qo'shish
const createOptionQuiz = async (req, res) => {
  try {
    const { text, subject, difficulty, points, options, correctAnswer, admin } = req.body;

    const newOptionQuiz = new OptionQuiz({
      text,
      subject,
      difficulty,
      points,
      options,
      correctAnswer,
      admin,
    });

    const savedOptionQuiz = await newOptionQuiz.save();
    res.status(201).json(savedOptionQuiz);
  } catch (error) {
    res.status(500).json({ message: "Savolni yaratishda xatolik", error });
  }
};

// Barcha savollarni olish
const getAllOptionQuizs = async (req, res) => {
  try {
    const { adminId } = req.query; // ?adminId=123 tarzida URL query orqali keladi

    const filter = adminId ? { admin: adminId } : {};

    const optionQuizs = await OptionQuiz.find(filter).populate(
      "admin",
      "name lastname"
    );

    res.status(200).json(optionQuizs);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Variantli savollarni olishda xatolik",
        error: error.message,
      });
  }
};

// Bitta savolni olish (ID orqali)
const getOptionQuizById = async (req, res) => {
  try {
    const OptionQuiz = await OptionQuiz.findById(req.params.id);
    if (!OptionQuiz) {
      return res.status(404).json({ message: "Savol topilmadi" });
    }
    res.status(200).json(OptionQuiz);
  } catch (error) {
    res.status(500).json({ message: "Savolni olishda xatolik", error });
  }
};

// Savolni tahrirlash (ID orqali)
const updateOptionQuiz = async (req, res) => {
  try {
    const updatedOptionQuiz = await OptionQuiz.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedOptionQuiz) {
      return res.status(404).json({ message: "Savol topilmadi" });
    }

    res.status(200).json(updatedOptionQuiz);
  } catch (error) {
    res.status(500).json({ message: "Savolni yangilashda xatolik", error });
  }
};

// Savolni o'chirish (ID orqali)
const deleteOptionQuiz = async (req, res) => {
  try {
    const deleted = await OptionQuiz.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Savol topilmadi" });
    }

    res.status(200).json({ message: "Savol o'chirildi" });
  } catch (error) {
    res.status(500).json({ message: "Savolni o'chirishda xatolik", error });
  }
};

module.exports = {
  createOptionQuiz,
  getAllOptionQuizs,
  getOptionQuizById,
  updateOptionQuiz,
  deleteOptionQuiz,
};
