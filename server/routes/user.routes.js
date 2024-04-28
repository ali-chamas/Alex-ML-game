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
router.get("/get_my_info", getLoggedInUser);
router.put("/update_my_info", updateUser);

//games
router.post("/start_game/", startGame);
router.put("/restart_game/", restartGame);
router.put("/complete_game/", completeGame);
router.get("/get_games", getAllGames);

//model
router.post("/add_label/", addLabels);
router.post("/add_example/", addExamples);
router.post("/delete_label/", deleteLabel);
router.post("/delete_example/", deleteExample);
router.post("/train/", trainModel);
router.post("/test", testModel);

module.exports = router;
