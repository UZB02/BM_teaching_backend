const express = require("express");
const router = express.Router();
const {
  createOptionQuiz,
  getAllOptionQuizs,
  getOptionQuizById,
  deleteOptionQuiz,
  updateOptionQuiz,
  getRandomQuestions
} = require("../controllers/optionQuizController");
const { protect } = require("../middlewares/authMiddleware");
// CRUD route'lar
router.post("/",protect, createOptionQuiz);
router.get("/", protect, getAllOptionQuizs);
router.get("/random", protect, getRandomQuestions);
router.get("/:id", protect, getOptionQuizById);
router.put("/:id", protect, updateOptionQuiz);
router.delete("/:id", protect, deleteOptionQuiz);

module.exports = router;
