// routes/questionRoutes.js
const express = require("express");
const router = express.Router();
const {
  getAllQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  getQuestionById
} = require("../controllers/questionController");
const { protect } = require("../middlewares/authMiddleware");

router.get("/", protect, getAllQuestions);
router.post("/", protect, createQuestion);
router.get("/:id", protect, getQuestionById);
router.delete("/delet/:id", protect, deleteQuestion);
router.put("/:id", protect, updateQuestion);

module.exports = router;
