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

  getSingleGame,
} = require("../controllers/game.controller");
const getAvatars = require("../controllers/avatar.controller");
const router = express.Router();

//user
router.get("/get_my_info", getLoggedInUser);
router.put("/update_my_info", updateUser);

//games
router.post("/start_game/", startGame);

router.put("/complete_game/", completeGame);
router.get("/get_games", getAllGames);
router.get("/get_game/:gameId", getSingleGame);

//model
router.post("/add_label/", addLabels);
router.post("/add_example/", addExamples);
router.post("/delete_label/", deleteLabel);
router.post("/delete_example/", deleteExample);
router.post("/train_model", trainModel);
router.post("/test_model", testModel);

//avatars
router.get("/get_avatars", getAvatars);

module.exports = router;
