const User = require("../models/User.model");
const Game = require("../models/Game.model");

const updateUser = async (req, res) => {
  const allowedUpdates = [
    "firstName",
    "lastName",
    "username",
    "email",
    "age",
    "avatar",
  ];
  const updates = Object.keys(req.body).filter((key) =>
    allowedUpdates.includes(key)
  );

  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      select: updates.join(" "),
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const updateUserRole = async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { role },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const startGame = async (req, res) => {
  const { userId } = req.params;
  const { gameId } = req.body;
  try {
    const game = await Game.findById(gameId);
    const user = await User.findById(userId);
    console.log(game);
    if (game) {
      user.games.push(game);
      await user.save();
    } else res.status(400).json({ message: "no game found" });
    return res.status(200).json({ message: "game started!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  updateUser,
  deleteUser,
  updateUserRole,
  getAllUsers,
  startGame,
};
