const jwt = require("jsonwebtoken");
const User = require("../models/User.model");

const authMiddleware = async (req, res, next) => {
  const bearerHeader = req.headers["authorization"];

  try {
    if (typeof bearerHeader !== "undefined") {
      const token = bearerHeader.split(" ")[1];
      if (!token) return res.status(401).send("Unauthenticated");

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findById(decoded._id).select("-password");

      if (decoded) {
        req.user = user;
        next();
      }
    } else {
      return res.status(401).json({ message: "invalid token" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal server error ");
  }
};

module.exports = authMiddleware;
