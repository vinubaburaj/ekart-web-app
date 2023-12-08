import User from "../models/user.js";
import { hash } from "bcrypt";

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
  try {
    // Check if the user making the request is an admin
    if (!isAdmin(user)) {
      return res
        .status(403)
        .json({ error: "Permission denied. Admin access required." });
    }

    const { firstName, lastName, email, password, role } = req.body;
    try {
      if (role !== "BUYER" && role !== "SELLER" && role !== "ADMIN") {
        return res.status(400).json({ message: "Invalid role" });
      }
      console.log("Registering user: ", req.body);
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
      // Save the user to the database
      const user = new User({
        firstName,
        lastName,
        email,
        password: await hash(password, 10),
        role,
      });

      const newUser = await user.save();
      res.json(newUser);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
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
