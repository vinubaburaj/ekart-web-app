import { compare, hash } from "bcrypt";
import User from "../models/user.js";
import reviewModel from "../models/review.js";

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

export const updateProfile = async (req, res) => {
  try {
    const userId = req.params.profileId;
    if (!userId) {
      return res.status(400).json({ message: "Profile ID not present" });
    }

    // Fetch the user from the database
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the password in req.body is different from the one in the database
    if (
      req.body.password &&
      !(await compare(req.body.password, user.password))
    ) {
      // Hash the new password
      req.body.password = await hash(req.body.password, 10);
    }

    // Update the user with the new data
    const updatedProfile = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
    });

    res.status(200).json(updatedProfile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getReviewsByUser = async (req, res) => {
  try {
    const userId = req.params.profileId;
    const reviews = await reviewModel
      .find({ user: userId })
      .populate({ path: "productId", model: "Product" });
    res.status(200).json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server error" });
  }
};
