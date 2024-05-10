const express = require("express");
const {
  getAllUsers,
  deleteUser,
  updateUserRole,
} = require("../controllers/user.controller");
const { approveGame, deleteGame } = require("../controllers/game.controller");
const router = express.Router();

//users

router.delete("/delete_user/:id", deleteUser);
router.put("/update_role/:id", updateUserRole);

//games
router.put("/approve_game/:gameId", approveGame);

module.exports = router;
