const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const USER_ROLES = require("../utils/USER_ROLE_ENUMS");
const { gameSchema } = require("./Game.model");
const { modelSchema, Model } = require("./machineModel.model");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: "First name is required",
  },
  lastName: {
    type: String,
    required: "Last name is required",
  },
  username: {
    type: String,
    required: "username is required",
    unique: true,
  },
  email: {
    type: String,
    unique: true,
    sparse: true,
  },
  password: {
    type: String,
    required: "Password is required",
  },
  age: {
    type: Number,
    required: "Age is required",
  },
  role: {
    type: String,
    enum: [USER_ROLES.ADMIN, USER_ROLES.USER, USER_ROLES.CREATOR],
    default: USER_ROLES.USER,
  },
  avatar: {
    type: String,
    default: "avatars/avatar1.jpg",
  },
  progress: {
    type: Number,
    default: 1,
  },
  gamesProgress: [
    {
      _id: { type: mongoose.Schema.Types.ObjectId, ref: "Game", index: true },
      finished: { type: Boolean, default: false },
      model: { type: modelSchema, default: Model },
    },
  ],
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
