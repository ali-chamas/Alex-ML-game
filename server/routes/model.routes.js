const express = require("express");
const { addLabels, addExamples } = require("../controllers/model.controller");
const router = express.Router();

router.post("/add_label/:userId", addLabels);
router.post("/add_example/:userId", addExamples);

module.exports = router;
