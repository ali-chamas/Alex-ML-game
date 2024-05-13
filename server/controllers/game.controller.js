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
  const { user } = req;
  const { gameId } = req.params;
  try {
    const game = user.games.find((g) => g._id.toString() === gameId);

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
    const users = await User.find();

    for (const user of users) {
      const gamesAfterDelete = user.gamesProgress.filter(
        (game) => game._id != gameId
      );

      const updatedUser = await User.findByIdAndUpdate(user._id, {
        games: gamesAfterDelete,
      });
    }

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
  const { user } = req;
  const { gameId } = req.body;

  try {
    const gameIndex = user.games.findIndex(
      (game) => game._id.toString() === gameId
    );
    if (gameIndex < 0) {
      return res
        .status(400)
        .json({ message: "Game not found in user's games" });
    }

    user.games[gameIndex].isComplete = !user.games[gameIndex].isComplete;

    await user.save();

    res.status(200).json(user.games[gameIndex]);
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

    if (game) {
      user.gamesProgress.push({ gameId: gameId });
      await user.save();
    } else res.status(400).json({ message: "no game found" });
    return res.status(200).json({ message: "game started!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//NOT USED AT THE MOMENT

// const restartGame = async (req, res) => {
//   const userId = req.user._id;
//   const { gameId } = req.body;
//   try {
//     const newGame = await Game.findById(gameId);
//     const user = await User.findById(userId);

//     if (newGame) {
//       const foundGameIndex = user.games.findIndex(
//         (game) => game._id.toString() === gameId
//       );

//       if (foundGameIndex >= 0) {
//         user.games[foundGameIndex] = newGame;
//       }
//       const updatedUser = await User.findByIdAndUpdate(
//         userId,
//         {
//           games: user.games,
//         },
//         { new: true }
//       );
//       return res.status(200).json({ updatedUser });
//     } else res.status(400).json({ message: "no game found" });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };

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
