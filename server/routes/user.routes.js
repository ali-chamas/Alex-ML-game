const express = require("express");
const {
  getAllUsers,
  deleteUser,
  updateUserRole,
  updateUser,
  startGame,
  restartGame,
} = require("../controllers/user.controller");
const router = express.Router();

router.get("/get", getAllUsers);
router.delete("/delete/:id", deleteUser);
router.put("/update/:id", updateUser);
router.put("/update_role/:id", updateUserRole);
router.put("/start_game/:userId", startGame);
router.put("/restart_game/:userId", restartGame);

module.exports = router;
