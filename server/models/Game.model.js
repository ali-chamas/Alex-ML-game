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
      label: {
        labelId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Label",
        },
        labelName: {
          type: String,
          required: "Label name is required",
        },
        examples: [
          {
            exampleId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Example",
            },
            example: {
              type: String,
            },
          },
        ],
      },
    },
    isTrained: {
      type: Boolean,
      default: false,
    },
    modelUrl: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    trainedAt: {
      type: Date,
    },
  },
});

const Game = mongoose.model("Game", gameSchema);

module.exports = User;
