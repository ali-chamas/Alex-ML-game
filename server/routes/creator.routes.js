const express = require("express");
const {
  createGame,
  updateGame,
  deleteGame,
} = require("../controllers/game.controller");
const { getAllUsers } = require("../controllers/user.controller");
const router = express.Router();

//games

router.post("/add_game", createGame);
router.put("/update_game/:gameId", updateGame);

//users

router.delete("/delete_game/:gameId", deleteGame);
module.exports = router;
