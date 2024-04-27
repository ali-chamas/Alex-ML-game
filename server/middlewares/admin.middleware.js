const USER_ROLES = require("../utils/USER_ROLE_ENUMS");

const adminMiddleware = (req, res, next) => {
  try {
    if (req.user.role === USER_ROLES.ADMIN) returnnext();
    return res.status(401).send("Unauthorized");
  } catch (e) {
    console.log("Internal server error: ", e);
    return res.status(500).send("Internal server error.");
  }
};

module.exports = adminMiddleware;
