const Game = require("../models/Game.model");

const createGame = async (req, res) => {
  try {
    const { name, description, image, solution, hint, level, type } = req.body;
    const newGame = await Game.create({
      name,
      description,
      image,
      solution,
      hint,
      level,
      type,
    });
    res.status(201).json(newGame);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating game");
  }
};
