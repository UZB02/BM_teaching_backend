// routes/adminRoutes.js
const express = require("express");
const router = express.Router();
const {
  registerAdmin,
  loginAdmin,
  getAllAdmins
} = require("../controllers/adminController");

const { protect } = require("../middlewares/authMiddleware");

// Admin ro'yxatdan o'tadi
router.post("/register", registerAdmin);

// Admin login qiladi
router.post("/login", loginAdmin);

// Barcha adminlarni olish (faqat avtorizatsiyalangan foydalanuvchi uchun)
router.get("/", protect, getAllAdmins);

module.exports = router;
