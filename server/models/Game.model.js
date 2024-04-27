const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "Name is required",
  },
  description: {
    type: String,
    required: "Description is required",
  },
  image: {
    type: String,
    required: "Image is required",
  },
  solution: {
    type: String,
    required: "Solution is required",
  },
  hint: {
    type: String,
    required: "Hint is required",
  },
  level: {
    type: String,
    enum: ["beginner", "intermediate", "advanced"],
    required: "Level is required",
  },
  type: {
    type: String,
    enum: ["text", "image", "numbers"],
    required: "Type is required",
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
  isComplete: {
    type: Boolean,
    default: false,
  },
  model: {
    modelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Model",
    },
    dataset: {
      labels: [],
    },
    isTrained: {
      type: Boolean,
      default: false,
    },
    modelUrl: {
      type: String,
      default: "",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    trainedAt: {
      type: Date,
      default: null,
    },
  },
});

const Game = mongoose.model("Game", gameSchema);

module.exports = Game;
