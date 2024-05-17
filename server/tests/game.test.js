const sinon = require("sinon");
const { approveGame, completeGame } = require("../controllers/game.controller");
const Game = require("../models/Game.model");

describe("Game Controller", () => {
  let req, res, next;

  beforeEach(() => {
    req = { params: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    };
    next = jest.fn();
  });

  afterEach(() => {
    sinon.restore();
  });

  describe("approveGame", () => {
    it("should approve a game successfully", async () => {
      const gameId = "123";
      const existingGame = { _id: gameId, name: "Test Game" };
      sinon.stub(Game, "findById").resolves(existingGame);
      sinon
        .stub(Game, "findByIdAndUpdate")
        .resolves({ ...existingGame, isApproved: true });

      req.params.gameId = gameId;
      await approveGame(req, res, next);

      expect(res.json).toHaveBeenCalledWith({
        message: "Game approval status set to true",
      });
    });

    it("should handle game not found during approval", async () => {
      sinon.stub(Game, "findById").resolves(null);

      req.params.gameId = "123";
      await approveGame(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Game not found" });
    });
  });

  describe("completeGame", () => {
    it("should toggle game completion status successfully", async () => {
      const gameId = "123";
      const userId = "456";
      const user = {
        _id: userId,
        gamesProgress: [{ _id: gameId, finished: false }],
      };
      sinon.stub(Game, "findById").resolves({ _id: gameId });
      sinon.stub(User, "findById").resolves(user);

      req.body.gameId = gameId;
      req.user = { id: userId };
      await completeGame(req, res, next);

      expect(user.gamesProgress[0].finished).toBe(true);
      expect(user.progress).toBe(1);
      expect(user.currentGame).toBeNull();
      expect(res.json).toHaveBeenCalledWith({
        message: "Game status toggled successfully",
        userProgress: 1,
      });
    });

    it("should handle game progress not found during completion", async () => {
      const gameId = "123";
      const userId = "456";
      const user = { _id: userId, gamesProgress: [] };
      sinon.stub(Game, "findById").resolves({ _id: gameId });
      sinon.stub(User, "findById").resolves(user);

      req.body.gameId = gameId;
      req.user = { id: userId };
      await completeGame(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: "Game progress not found",
      });
    });

    it("should handle user not found during completion", async () => {
      sinon.stub(Game, "findById").resolves({ _id: "123" });
      sinon.stub(User, "findById").resolves(null);

      req.body.gameId = "123";
      req.user = null;
      await completeGame(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "User not found" });
    });
  });
});
