const express = require("express");
const {
  addLabels,
  addExamples,
  deleteLabel,
  deleteExample,
  trainModel,
  testModel,
} = require("../controllers/model.controller");
const router = express.Router();

router.post("/add_label/:userId", addLabels);
router.post("/add_example/:userId", addExamples);
router.post("/delete_label/:userId", deleteLabel);
router.post("/delete_example/:userId", deleteExample);
router.post("/train/:userId", trainModel);
router.post("/test", testModel);

module.exports = router;
