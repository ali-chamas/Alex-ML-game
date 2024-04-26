const express = require("express");
const {
  createGame,
  getAllGames,
  updateGame,
  deleteGame,
  approveGame,
  completeGame,
} = require("../controllers/game.controller");
const router = express.Router();

router.post("/add", createGame);
router.get("/get", getAllGames);
router.put("/update/:gameId", updateGame);
router.put("/approve/:gameId", approveGame);
router.put("/complete/:gameId", completeGame);
router.delete("/delete/:gameId", deleteGame);

module.exports = router;
