const express = require("express");
const {
  getAllUsers,
  deleteUser,
  updateUserRole,
  getUserRegistrations,
} = require("../controllers/user.controller");
const {
  approveGame,
  deleteGame,
  rejectGame,
} = require("../controllers/game.controller");
const router = express.Router();

//users

router.delete("/delete_user/:id", deleteUser);

router.get("/get_registrations", getUserRegistrations);
router.put("/update_role/:id", updateUserRole);

//games
router.put("/approve_game/:gameId", approveGame);
router.put("/reject_game/:gameId", rejectGame);

module.exports = router;
