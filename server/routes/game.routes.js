const express = require("express");
const { createGame, getAllGames } = require("../controllers/game.controller");
const router = express.Router();

router.post("/add", createGame);
router.get("/get", getAllGames);

module.exports = router;
