// routes/questionRoutes.js
const express = require("express");
const router = express.Router();
const {
  getAllQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  getQuestionById,
  getRandomQuestions,
} = require("../controllers/questionController");
const { protect } = require("../middlewares/authMiddleware");

router.get("/", protect, getAllQuestions);
router.get("/random", protect, getRandomQuestions);
router.get("/:id", protect, getQuestionById);
router.post("/", protect, createQuestion);
router.delete("/delet/:id", protect, deleteQuestion);
router.put("/:id", protect, updateQuestion);

module.exports = router;
