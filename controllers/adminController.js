// controllers/adminController.js
const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const generateToken = (admin) => {
  return jwt.sign({ id: admin._id, name: admin.name }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

exports.registerAdmin = async (req, res) => {
  const { name, email, password } = req.body;

  const existingAdmin = await Admin.findOne({ email });
  if (existingAdmin) {
    return res.status(400).json({ message: "Bu email allaqachon ro'yxatdan o'tgan" });
  }

  const admin = await Admin.create({ name, email, password });
  res.status(201).json({ token: generateToken(admin), admin });
};

exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email });

  if (!admin || !(await bcrypt.compare(password, admin.password))) {
    return res.status(401).json({ message: "Noto‘g‘ri email yoki parol" });
  }

  res.json({ token: generateToken(admin), admin });
};

// Yangi qo‘shilgan funksiya
exports.getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find().select("-password"); // parolni ko‘rsatmaymiz
    res.json(admins);
  } catch (err) {
    res.status(500).json({ message: "Serverda xatolik", error: err.message });
  }
};

exports.getAdminById = async (req, res) => {
  try {
    const adminId = req.params.id; // URL dan id ni olish
    const admin = await Admin.findById(adminId); // ID bo'yicha adminni topish

    if (!admin) {
      return res.status(404).json({ message: "Admin topilmadi" });
    }
    res.status(200).json(admin); // Admin topildi
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server xatosi" });
  }
};
