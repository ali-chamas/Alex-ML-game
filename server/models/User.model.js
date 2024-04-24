const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const USER_ROLES = require("../utils/USER_ROLE_ENUMS");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: "First name is required",
  },
  lastName: {
    type: String,
    required: "Last name is required",
  },
  email: {
    type: String,
    required: "email is required",
    unique: true,
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
    default: "public/avatars/avatar1.jpg",
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassowrd = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
