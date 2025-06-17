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

const getRandomQuestions = async (req, res) => {
  try {
    const difficultyMapping = {
      Oson: "Oson",
      Orta: "O'rta",
      "O'rta": "O'rta",
      Qiyin: "Qiyin",
      "Juda qiyin": "Juda qiyin",
    };

    let allQuestions = [];

    for (const [key, value] of Object.entries(req.query)) {
      const count = parseInt(value);
      if (isNaN(count) || count <= 0) continue;

      const difficulty = difficultyMapping[key];
      if (!difficulty) {
        console.warn(`Noto'g'ri difficulty: ${key}`);
        continue;
      }

      // Check if yetarlicha savol mavjud
      const existingCount = await OptionQuiz.countDocuments({ difficulty });
      const finalCount = Math.min(existingCount, count); // mavjuddan ko'p so‘ralmasin

      if (finalCount === 0) continue;

      const questions = await OptionQuiz.aggregate([
        { $match: { difficulty } },
        { $sample: { size: finalCount } },
      ]);

      allQuestions = allQuestions.concat(questions);
    }

    return res.status(200).json(allQuestions);
  } catch (error) {
    console.error("getRandomQuestions error:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

// Bitta savolni olish (ID orqali)
const getOptionQuizById = async (req, res) => {
  try {
    const quiz = await OptionQuiz.findById(req.params.id); // ← o'zgaruvchi nomini o'zgartiring
    if (!quiz) {
      return res.status(404).json({ message: "Savol topilmadi" });
    }
    res.status(200).json(quiz);
  } catch (error) {
    console.error("Savolni olishda xatolik:", error); // ← foydali log
    res
      .status(500)
      .json({ message: "Savolni olishda xatolik", error: error.message });
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
  getRandomQuestions,
};
