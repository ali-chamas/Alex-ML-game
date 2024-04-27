const express = require("express");
const { createGame, updateGame } = require("../controllers/game.controller");
const router = express.Router();

//games
router.post("/add_game", createGame);
router.put("/update_game/:gameId", updateGame);

module.exports = router;
