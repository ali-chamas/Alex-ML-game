const User = require("../models/User.model");

const mongoose = require("mongoose");

const addLabels = async (req, res) => {
  const { userId } = req.params;
  const { gameId, label } = req.body;
  try {
    const user = await User.findById(userId);

    const foundGameIndex = user.games.findIndex(
      (game) => game._id.toString() === gameId
    );
    if (foundGameIndex >= 0) {
      user.games[foundGameIndex].model.dataset.labels.push({
        _id: new mongoose.Types.ObjectId(),
        labelName: label,
        examples: [],
      });
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          games: user.games,
        },
        { new: true }
      );

      return res.status(200).json(updatedUser.games);
    } else {
      return res.status(400).json({ message: "game no found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const addExamples = async (req, res) => {
  const { userId } = req.params;
  const { gameId, labelId, example } = req.body;
  try {
    const user = await User.findById(userId);

    const foundGameIndex = user.games.findIndex(
      (game) => game._id.toString() === gameId
    );
    if (foundGameIndex >= 0) {
      const labels = user.games[foundGameIndex].model.dataset.labels;

      const foundLabelIndex = labels.findIndex(
        (lab) => lab._id.toString() === labelId
      );

      if (foundLabelIndex) {
        labels[foundLabelIndex].examples.push({
          _id: new mongoose.Types.ObjectId(),
          example: example,
        });
        const updatedUser = await User.findByIdAndUpdate(
          userId,
          {
            games: user.games,
          },
          { new: true }
        );

        return res.status(200).json(updatedUser.games);
      } else {
        return res.status(400).json({ message: "label not found" });
      }
    } else {
      return res.status(400).json({ message: "no label found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const deleteLabel = async (req, res) => {
  const { userId } = req.params;
  const { gameId, labelId } = req.body;
  try {
    const user = await User.findById(userId);

    const foundGameIndex = user.games.findIndex(
      (game) => game._id.toString() === gameId
    );

    if (foundGameIndex >= 0) {
      const labels = user.games[foundGameIndex].model.dataset.labels;
      user.games[foundGameIndex].model.dataset.labels = labels.filter(
        (label) => label._id.toString() !== labelId
      );
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          games: user.games,
        },
        { new: true }
      );

      return res.status(200).json(updatedUser.games);
    } else {
      return res.status(400).json({ message: "game no found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const deleteExample = async (req, res) => {
  const { userId } = req.params;
  const { gameId, labelId, exampleId } = req.body;
  try {
    const user = await User.findById(userId);

    const foundGameIndex = user.games.findIndex(
      (game) => game._id.toString() === gameId
    );

    if (foundGameIndex >= 0) {
      const labels = user.games[foundGameIndex].model.dataset.labels;

      const foundLabelIndex = labels.findIndex(
        (label) => label._id.toString() === labelId
      );

      if (foundLabelIndex >= 0) {
        user.games[foundGameIndex].model.dataset.labels[
          foundLabelIndex
        ].examples = labels[foundLabelIndex].examples.filter(
          (example) => example._id.toString() !== exampleId
        );
        const updatedUser = await User.findByIdAndUpdate(
          userId,
          {
            games: user.games,
          },
          { new: true }
        );

        return res.status(200).json(updatedUser.games);
      } else {
        return res.status(400).json({ message: "label not found" });
      }
    } else {
      return res.status(400).json({ message: "game no found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { addLabels, addExamples, deleteLabel, deleteExample };
