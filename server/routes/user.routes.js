const express = require("express");
const {
  getAllUsers,
  deleteUser,
  updateUserRole,
  updateUser,
  getLoggedInUser,
} = require("../controllers/user.controller");

const {
  addExamples,
  addLabels,
  deleteExample,
  deleteLabel,
  testModel,
  trainModel,
} = require("../controllers/model.controller");

const {
  completeGame,
  getAllGames,
  startGame,
  restartGame,
} = require("../controllers/game.controller");
const router = express.Router();

//user
router.put("/update_my_info/:id", updateUser);
router.get("/get_my_info", getLoggedInUser);

//games
router.post("/start_game/:userId", startGame);
router.put("/restart_game/:userId", restartGame);
router.put("/complete_game/:gameId", completeGame);
router.get("/get_games", getAllGames);

//model
router.post("/add_label/:userId", addLabels);
router.post("/add_example/:userId", addExamples);
router.post("/delete_label/:userId", deleteLabel);
router.post("/delete_example/:userId", deleteExample);
router.post("/train/:userId", trainModel);
router.post("/test", testModel);

module.exports = router;
