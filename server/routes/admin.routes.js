const express = require("express");
const {
  getAllUsers,
  deleteUser,
  updateUserRole,
} = require("../controllers/user.controller");
const { approveGame, deleteGame } = require("../controllers/game.controller");
const router = express.Router();

//users
router.get("/get_users", getAllUsers);
router.delete("/delete_user/:id", deleteUser);
router.put("/update_role/:id", updateUserRole);

//games
router.put("/approve_game/:gameId", approveGame);
router.delete("/delete_game/:gameId", deleteGame);

module.exports = router;
