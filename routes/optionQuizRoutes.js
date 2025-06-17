const express = require("express");
const router = express.Router();
const {
  createOptionQuiz,
  getAllOptionQuizs,
  getOptionQuizById,
  deleteOptionQuiz,
  updateOptionQuiz,
} = require("../controllers/optionQuizController");

// CRUD route'lar
router.post("/", createOptionQuiz);
router.get("/", getAllOptionQuizs);
router.get("/:id", getOptionQuizById);
router.put("/:id", updateOptionQuiz);
router.delete("/:id", deleteOptionQuiz);

module.exports = router;
