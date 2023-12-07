import mongoose from "mongoose";
import User from "../models/user.js";

export const getProfile = async (req, res) => {
  try {
    const userId = req.params.profileId;
    const user = await User.findById(userId);

    if (!user) {
      res.status(404).json({ message: "User with id not found" });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
