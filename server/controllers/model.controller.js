const User = require("../models/User.model");
const brain = require("brain.js");
const { WordTokenizer } = require("natural");
const tokenizer = new WordTokenizer();
const fs = require("fs");

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

const trainModel = async (req, res) => {
  try {
    const { userId } = req.params;
    const { gameId } = req.body;

    const user = await User.findById(userId);

    const foundGameIndex = user.games.findIndex(
      (game) => game._id.toString() === gameId
    );

    if (foundGameIndex >= 0) {
      const trainingArray = user.games[foundGameIndex].model.dataset.labels;

      let trainingData = [];

      const normalizeText = (text) => text.toLowerCase();

      for (let label in trainingArray) {
        const examples = trainingArray[label].examples;
        examples.forEach((ex) => {
          const tokens = tokenizer.tokenize(normalizeText(ex.example));
          const input = tokens.reduce(
            (acc, token) => ({ ...acc, [token]: 1 }),
            {}
          );
          trainingData.push({
            input,
            output: { [trainingArray[label].labelName]: 1 },
          });
        });
      }

      const net = new brain.NeuralNetwork();

      const stats = net.train(trainingData, { log: true });

      const trainedModelJSON = net.toJSON();
      const newModelName = `trained_model_${new Date().getTime()}.json`;
      fs.writeFileSync(
        `public/trained_models/${newModelName}`,
        JSON.stringify(trainedModelJSON)
      );

      user.games[foundGameIndex].model.isTrained = true;
      user.games[foundGameIndex].model.trainedAt = new Date();
      user.games[
        foundGameIndex
      ].model.modelUrl = `trained_models/${newModelName}`;

      const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          games: user.games,
        },
        { new: true }
      );

      res.status(200).json(updatedUser.games[foundGameIndex]);
    } else {
      res.status(400).json({ message: "game not found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal server error" });
  }
};

const testModel = async (req, res) => {
  const { example, modelUrl } = req.body;

  const normalizeText = (text) => text.toLowerCase();
  const loadedModelJSON = JSON.parse(fs.readFileSync(`public/${modelUrl}`));
  const loadedModel = new brain.NeuralNetwork().fromJSON(loadedModelJSON);
  const inputText = example;

  const inputTokens = tokenizer.tokenize(normalizeText(inputText));

  const input = inputTokens.reduce(
    (acc, token) => ({ ...acc, [token]: 1 }),
    {}
  );
  const result = loadedModel.run(input, loadedModel);

  res.status(200).json(result);
};

module.exports = {
  addLabels,
  addExamples,
  deleteLabel,
  deleteExample,
  trainModel,
  testModel,
};
