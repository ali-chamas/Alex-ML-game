const express = require("express");
const {
  addLabels,
  addExamples,
  deleteLabel,
  deleteExample,
} = require("../controllers/model.controller");
const router = express.Router();

router.post("/add_label/:userId", addLabels);
router.post("/add_example/:userId", addExamples);
router.post("/delete_label/:userId", deleteLabel);
router.post("/delete_example/:userId", deleteExample);

module.exports = router;
