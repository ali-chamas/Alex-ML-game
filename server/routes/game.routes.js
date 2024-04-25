const express = require("express");
const { createGame } = require("../controllers/game.controller");
const router = express.Router();

router.post("/add", createGame);

module.exports = router;
