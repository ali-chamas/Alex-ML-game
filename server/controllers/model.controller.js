const User = require("../models/User.model");
const brain = require("brain.js");
const { WordTokenizer } = require("natural");
const tokenizer = new WordTokenizer();
const fs = require("fs");
const OpenAI = require("openai");

const mongoose = require("mongoose");

const addLabels = async (req, res) => {
  const userId = req.user._id;
  const { gameId, label } = req.body;
  try {
    const user = await User.findById(userId);

    const foundGameIndex = user.gamesProgress.findIndex(
      (game) => game._id.toString() === gameId
    );
    if (foundGameIndex >= 0) {
      user.gamesProgress[foundGameIndex].model.dataset.labels.push({
        _id: new mongoose.Types.ObjectId(),
        labelName: label,
        examples: [],
      });
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          gamesProgress: user.gamesProgress,
        },
        { new: true }
      );

      return res.status(200).json(updatedUser.gamesProgress);
    } else {
      return res.status(400).json({ message: "game no found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const addExamples = async (req, res) => {
  const userId = req.user._id;
  const { gameId, labelId, example } = req.body;
  try {
    const user = await User.findById(userId);

    console.log(user);

    const foundGameIndex = user.gamesProgress.findIndex(
      (game) => game._id.toString() === gameId
    );
    if (foundGameIndex >= 0) {
      const labels = user.gamesProgress[foundGameIndex].model.dataset.labels;

      const foundLabelIndex = labels.findIndex(
        (lab) => lab._id.toString() === labelId
      );

      if (foundLabelIndex >= 0) {
        labels[foundLabelIndex].examples.push({
          _id: new mongoose.Types.ObjectId(),
          example: example,
        });
        const updatedUser = await User.findByIdAndUpdate(
          userId,
          {
            gamesProgress: user.gamesProgress,
          },
          { new: true }
        );

        return res.status(200).json(updatedUser.gamesProgress);
      } else {
        return res.status(400).json({ message: "label not found" });
      }
    } else {
      return res.status(400).json({ message: "game not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const generateAiExample = async (req, res) => {
  const userId = req.user._id;
  const { gameId, labelId, labelName, previousExample } = req.body;
  try {
    const user = await User.findById(userId);

    const foundGameIndex = user.gamesProgress.findIndex(
      (game) => game._id.toString() === gameId
    );
    if (foundGameIndex >= 0) {
      const labels = user.gamesProgress[foundGameIndex].model.dataset.labels;

      const foundLabelIndex = labels.findIndex(
        (lab) => lab._id.toString() === labelId
      );

      if (foundLabelIndex >= 0) {
        const openai = new OpenAI(process.env.OPENAI_API_KEY);

        const response = await openai.chat.completions.create({
          messages: [
            {
              role: "user",
              content: `Your are w word generator, Generate an example of a simple word related to "${labelName}", generate a single word only without adding anything extra, different than ${previousExample}`,
            },
          ],
          model: "gpt-3.5-turbo",
        });

        if (response && response.choices) {
          const generatedText = response.choices[0].message.content;

          labels[foundLabelIndex].examples.push({
            _id: new mongoose.Types.ObjectId(),
            example: generatedText,
          });

          const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
              gamesProgress: user.gamesProgress,
            },
            { new: true }
          );

          return res.status(200).json(updatedUser.gamesProgress);
        } else {
          return res.status(500).json({ message: "Failed to generate text" });
        }
      } else {
        return res.status(400).json({ message: "Label not found" });
      }
    } else {
      return res.status(400).json({ message: "Game not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const deleteLabel = async (req, res) => {
  const userId = req.user._id;
  const { gameId, labelId } = req.body;
  try {
    const user = await User.findById(userId);

    const foundGameIndex = user.gamesProgress.findIndex(
      (game) => game._id.toString() === gameId
    );

    if (foundGameIndex >= 0) {
      const labels = user.gamesProgress[foundGameIndex].model.dataset.labels;
      user.gamesProgress[foundGameIndex].model.dataset.labels = labels.filter(
        (label) => label._id.toString() !== labelId
      );
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          gamesProgress: user.gamesProgress,
        },
        { new: true }
      );

      return res.status(200).json(updatedUser.gamesProgress);
    } else {
      return res.status(400).json({ message: "game no found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const deleteExample = async (req, res) => {
  const userId = req.user._id;
  const { gameId, labelId, exampleId } = req.body;
  try {
    const user = await User.findById(userId);

    const foundGameIndex = user.gamesProgress.findIndex(
      (game) => game._id.toString() === gameId
    );

    if (foundGameIndex >= 0) {
      const labels = user.gamesProgress[foundGameIndex].model.dataset.labels;

      const foundLabelIndex = labels.findIndex(
        (label) => label._id.toString() === labelId
      );

      if (foundLabelIndex >= 0) {
        user.gamesProgress[foundGameIndex].model.dataset.labels[
          foundLabelIndex
        ].examples = labels[foundLabelIndex].examples.filter(
          (example) => example._id.toString() !== exampleId
        );
        const updatedUser = await User.findByIdAndUpdate(
          userId,
          {
            gamesProgress: user.gamesProgress,
          },
          { new: true }
        );

        return res.status(200).json(updatedUser.gamesProgress);
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
    const userId = req.user._id;
    const { gameId } = req.body;

    const user = await User.findById(userId);

    const foundGameIndex = user.gamesProgress.findIndex(
      (game) => game._id.toString() === gameId
    );

    if (foundGameIndex >= 0) {
      const trainingArray =
        user.gamesProgress[foundGameIndex].model.dataset.labels;

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

      if (user.gamesProgress[foundGameIndex].model.modelUrl) {
        fs.unlinkSync(
          `public/${user.gamesProgress[foundGameIndex].model.modelUrl}`
        );
        console.log("removed");
      }
      fs.writeFileSync(
        `public/trained_models/${newModelName}`,
        JSON.stringify(trainedModelJSON)
      );

      user.gamesProgress[foundGameIndex].model.isTrained = true;
      user.gamesProgress[foundGameIndex].model.trainedAt = new Date();
      user.gamesProgress[
        foundGameIndex
      ].model.modelUrl = `trained_models/${newModelName}`;

      const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          gamesProgress: user.gamesProgress,
        },
        { new: true }
      );

      res.status(200).json(updatedUser.gamesProgress[foundGameIndex]);
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

  res.status(200).json({ example: example, result: result });
};

module.exports = {
  addLabels,
  addExamples,
  deleteLabel,
  deleteExample,
  trainModel,
  testModel,
  generateAiExample,
};
