const Game = require("../models/Game.model");
const uploadFile = require("../utils/uploadFile");

const createGame = async (req, res) => {
  try {
    const { name, description, hint, level, type } = req.body;
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

module.exports = { createGame, getAllGames };
