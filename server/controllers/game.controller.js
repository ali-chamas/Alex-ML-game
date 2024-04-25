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
    const imageName = uploadFile(image, "games-images");
    const solutionaName = uploadFile(solution, "games-solutions");
    const createdGame = await Game.create({
      name: name,
      description: description,
      image: imageName,
      level: level,
      type: type,
      solution: solutionaName,
      hint: hint,
    });
    res.status(201).json(newGame);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating game");
  }
};

module.exports = { createGame };
