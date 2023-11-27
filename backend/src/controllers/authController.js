import User from "../models/user.js";
import { hash, compare } from "bcrypt";

const register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    // Save the user to the database
    const user = new User({
      firstName,
      lastName,
      email,
      password: await hash(password, 10),
    });
    await user.save();

    // Set the user session
    req.session.user = user;

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the entered password with the hashed password
    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export {
  register,
  login,
};
