const User = require("../models/User.model");

const updateUser = async (req, res) => {
  const allowedUpdates = [
    "firstName",
    "lastName",
    "username",
    "email",
    "age",
    "avatar",
  ];
  const updates = Object.keys(req.body).filter((key) =>
    allowedUpdates.includes(key)
  );

  try {
    const updatedUser = await User.findByIdAndUpdate(req.user._id, req.body, {
      new: true,
      runValidators: true,
      select: updates.join(" "),
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    if (error.name === "MongoServerError" && error.code === 11000) {
      return res.status(400).json({ message: "Username is already taken" });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const updateUserRole = async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { role },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getCreators = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    const creators = users.filter((user) => user.role == "creator");
    return res.status(200).json(creators);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getLoggedInUser = async (req, res) => {
  const { user } = req;

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(401).json({ message: "Unauthenticated" });
  }
};

const getUserRegistrations = async (req, res) => {
  try {
    const registrations = await User.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          userCount: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.json(registrations);
  } catch (error) {
    console.error("Error fetching user registrations:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  updateUser,
  deleteUser,
  updateUserRole,
  getAllUsers,
  getLoggedInUser,
  getCreators,
  getUserRegistrations,
};
