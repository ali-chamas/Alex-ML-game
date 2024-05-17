// user.test.js

const sinon = require("sinon");
const {
  updateUser,
  deleteUser,
  updateUserRole,
} = require("../controllers/user.controller");
const User = require("../models/User.model");

describe("User Controller", () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      user: { _id: "123" },
      params: { id: "123" },
      body: { firstName: "John", lastName: "Doe", role: "admin" },
    };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    next = jest.fn();
  });

  afterEach(() => {
    sinon.restore();
  });

  describe("updateUser", () => {
    it("should update user successfully", async () => {
      const updatedUser = {
        _id: "123",
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
      };
      sinon.stub(User, "findByIdAndUpdate").resolves(updatedUser);

      await updateUser(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "User updated successfully",
        user: updatedUser,
      });
    });
  });

  describe("deleteUser", () => {
    it("should handle user not found", async () => {
      sinon.stub(User, "findByIdAndDelete").resolves(null);

      await deleteUser(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "User not found" });
    });
  });

  describe("updateUserRole", () => {
    it("should update user role successfully", async () => {
      const updatedUser = { _id: "123", role: "admin" };
      sinon.stub(User, "findByIdAndUpdate").resolves(updatedUser);

      await updateUserRole(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(updatedUser);
    });
  });
});
