const { Game } = require("../models/Game.model");
const uploadFile = require("../utils/uploadFile");
const User = require("../models/User.model");

const createGame = async (req, res) => {
  try {
    const { name, description, hint, level, type, order } = req.body;
    const { image, solution } = req.files;
    const imagePath = `games-images/${uploadFile(image, "games-images")}`;
    const solutionPath = `games-solutions/${uploadFile(
      solution,
      "games-solutions"
    )}`;

    const newGame = await Game.create({
      name: name,
      description: description,
      image: imagePath,
      solution: solutionPath,
      hint: hint,
      level: level,
      type: type,
      order: order,
    });

    res.status(201).json(newGame);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating game");
  }
};

const getAllGames = async (req, res) => {
  try {
    const games = await Game.find();
    res.json(games);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching games" });
  }
};

const getSingleGame = async (req, res) => {
  const { gameId } = req.params;
  try {
    const game = await Game.findById(gameId);
    if (game) {
      res.status(200).json(game);
    } else {
      res.status(401).json({ message: "game not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
    console.log(error);
  }
};

const updateGame = async (req, res) => {
  const { gameId } = req.params;
  const updates = req.body;
  if (req.files) {
    const { image, solution } = req.files;
    let imagePath = "";
    let solutionPath = "";

    if (image) {
      imagePath = `games-images/${uploadFile(image, "games-images")}`;
      updates["image"] = imagePath;
    }
    if (solution) {
      solutionPath = `games-solutions/${uploadFile(
        solution,
        "games-solutions"
      )}`;
      updates["solution"] = solutionPath;
    }
  }

  try {
    const updatedGame = await Game.findByIdAndUpdate(gameId, updates, {
      new: true,
    });
    if (!updatedGame) {
      return res.status(404).json({ message: "Game not found" });
    }
    res.json(updatedGame);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Error updating game" });
  }
};

const deleteGame = async (req, res) => {
  const { gameId } = req.params;

  try {
    const deletedGame = await Game.findByIdAndDelete(gameId);
    if (!deletedGame) {
      return res.status(404).json({ message: "Game not found" });
    }
    res.json({ message: "Game deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting game" });
  }
};

const approveGame = async (req, res) => {
  const { gameId } = req.params;

  try {
    const existingGame = await Game.findById(gameId);
    if (!existingGame) {
      return res.status(404).json({ message: "Game not found" });
    }

    const isApproved = !existingGame.isApproved; // Toggle the existing value

    const updatedGame = await Game.findByIdAndUpdate(
      gameId,
      { isApproved },
      { new: true }
    );
    res.json({ message: `Game approval status set to ${isApproved}` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error approving game" });
  }
};

const completeGame = async (req, res) => {
  const { gameId } = req.body;

  try {
    const existingGame = await Game.findById(gameId);
    if (!existingGame) {
      return res.status(404).json({ message: "Game not found" });
    }

    const isComplete = !existingGame.isComplete; // Toggle the existing value

    const updatedGame = await Game.findByIdAndUpdate(
      gameId,
      { isComplete },
      { new: true }
    );
    res.json({ message: `Game completion status set to ${isComplete}` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error approving game" });
  }
};

const startGame = async (req, res) => {
  const userId = req.user._id;
  const { gameId } = req.body;
  try {
    const game = await Game.findById(gameId);
    const user = await User.findById(userId);
    game.isStarted = true;

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

const restartGame = async (req, res) => {
  const userId = req.user._id;
  const { gameId } = req.body;
  try {
    const newGame = await Game.findById(gameId);
    const user = await User.findById(userId);

    if (newGame) {
      const foundGameIndex = user.games.findIndex(
        (game) => game._id.toString() === gameId
      );

      if (foundGameIndex >= 0) {
        user.games[foundGameIndex] = newGame;
      }
    } else res.status(400).json({ message: "no game found" });
    await user.save();
    return res.status(200).json({ message: "game restarted!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createGame,
  getAllGames,
  getSingleGame,
  updateGame,
  deleteGame,
  approveGame,
  completeGame,
  startGame,
  restartGame,
};
