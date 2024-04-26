const express = require("express");
const { addLabels } = require("../controllers/model.controller");
const router = express.Router();

router.post("/add_label/:userId", addLabels);

module.exports = router;
