const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  // const token = req.headers.authorization;
  const { token } = req.cookies;
  // console.log(token);
  // console.log(req.headers);
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = authMiddleware;
