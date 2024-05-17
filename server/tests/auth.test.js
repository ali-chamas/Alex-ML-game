// auth.test.js

const sinon = require("sinon");
const jwt = require("jsonwebtoken");
const { register, login, logout } = require("../controllers/auth.controller");
const User = require("../models/User.model");

describe("Auth Controller", () => {
  let req, res, next;

  beforeEach(() => {
    req = { body: {}, params: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      clearCookie: jest.fn(),
      send: jest.fn(),
    };
    next = jest.fn();
  });

  afterEach(() => {
    sinon.restore();
  });

  describe("register", () => {
    it("should register a new user successfully", async () => {
      const userData = {
        firstName: "John",
        lastName: "Doe",
        age: 30,
        username: "john_doe",
        password: "password",
      };
      sinon.stub(User, "findOne").resolves(null);
      sinon.stub(User, "create").resolves({ ...userData, _id: "123" });
      sinon.stub(jwt, "sign").returns("token123");

      req.body = userData;
      await register(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        user: { ...userData, _id: "123" },
        token: "token123",
      });
    });

    it("should handle existing username during registration", async () => {
      sinon.stub(User, "findOne").resolves({ username: "existing_user" });

      req.body = { username: "existing_user" };
      await register(req, res, next);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith("username already exists!");
    });
  });

  describe("logout", () => {
    it("should logout a user successfully", async () => {
      await logout(req, res, next);

      expect(res.clearCookie).toHaveBeenCalledWith("jwtToken");
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: "Logout successful",
      });
    });
  });
});
