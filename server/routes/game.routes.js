const express = require("express");
const {
  createGame,
  getAllGames,
  updateGame,
  deleteGame,
} = require("../controllers/game.controller");
const router = express.Router();

router.post("/add", createGame);
router.get("/get", getAllGames);
router.put("/update/:gameId", updateGame);
router.delete("/delete/:gameId", updateGame);

module.exports = router;
