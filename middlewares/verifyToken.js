const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    // Authorization: Bearer <token>
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Token taqdim etilmagan" });
    }

    const token = authHeader.split(" ")[1];

    // Tokenni tekshirish
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Foydalanuvchi ma'lumotlarini req.user ga qo'shamiz
    req.user = decoded;

    next();
  } catch (error) {
    return res
      .status(403)
      .json({
        message: "Token noto‘g‘ri yoki muddati tugagan",
        error: error.message,
      });
  }
};

module.exports = verifyToken;
