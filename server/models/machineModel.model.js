const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema(
  {
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
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "trainedAt",
    },
  }
);

const Model = mongoose.model("Model", modelSchema);

module.exports = { Model, modelSchema };
