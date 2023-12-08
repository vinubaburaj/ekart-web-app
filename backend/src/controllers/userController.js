import User from "../models/user.js";

const isAdmin = (user) => {
  return user.role === "ADMIN";
};

// Controller logic for user routes
export const getAllUsers = async (req, res) => {
  const user = req.session.currentUser;
  try {
    // Check if the user making the request is an admin
    if (!isAdmin(user)) {
      return res
        .status(403)
        .json({ error: "Permission denied. Admin access required." });
    }

    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createUser = async (req, res) => {
  const user = req.session.currentUser;
  console.log("CURRENT USER: ", user);
  try {
    // Check if the user making the request is an admin
    if (!isAdmin(user)) {
      return res
        .status(403)
        .json({ error: "Permission denied. Admin access required." });
    }

    const newUser = await User.create(req.body);
    res.json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const user = req.session.currentUser;
  try {
    // Check if the user making the request is an admin
    if (!isAdmin(user)) {
      return res
        .status(403)
        .json({ error: "Permission denied. Admin access required." });
    }

    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(deletedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
