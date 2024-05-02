const mongoose = require("mongoose");

const avatarSchema = new mongoose.Schema({
  avatarUrl: { type: String },
});

const Avatar = mongoose.model("Model", modelSchema);

module.exports = { Avatar, avatarSchema };
