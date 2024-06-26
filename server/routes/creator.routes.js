const express = require("express");
const {
  createGame,
  updateGame,
  deleteGame,
} = require("../controllers/game.controller");
const {
  getAllUsers,
  getCreators,
  getFinishedUsers,
} = require("../controllers/user.controller");
const router = express.Router();

//games

router.post("/add_game", createGame);
router.put("/update_game/:gameId", updateGame);
router.delete("/delete_game/:gameId", deleteGame);

//users
router.get("/get_creators", getCreators);
router.get("/get_users", getAllUsers);
router.get("/get_finished_users", getFinishedUsers);

module.exports = router;
