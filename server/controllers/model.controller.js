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
    }
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        games: user.games,
      },
      { new: true }
    );

    return res.status(200).json(updatedUser.games);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { addLabels };
