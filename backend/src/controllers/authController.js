import User from "../models/user.js";
import {compare, hash} from "bcrypt";

const register = async (req, res) => {
  const {firstName, lastName, email, password, role} = req.body;
  try {
    if (role !== "BUYER" && role !== "SELLER") {
      return res.status(400).json({message: "Invalid role"});
    }
    console.log("Registering user: ", req.body);
    const existingUser = await User.findOne({email});
    if (existingUser) {
      return res.status(400).json({message: "User already exists"});
    }
    // Save the user to the database
    const user = new User({
      firstName,
      lastName,
      email,
      password: await hash(password, 10),
      role
    });

    await user.save();

    // Set the user session
    req.session['currentUser'] = user;

    res.status(201).json({message: "User registered successfully"});
  } catch (error) {
    console.error(error);
    res.status(500).json({message: "Internal server error"});
  }
};

const login = async (req, res) => {
  try {
    const {email, password} = req.body;

    // Find the user by email
    const user = await User.findOne({email});

    // Check if the user exists
    if (!user) {
      return res.status(404).json({message: "User not found"});
    }

    // Compare the entered password with the hashed password
    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({message: "Invalid password"});
    }
    req.session['currentUser'] = user;
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: "Internal server error"});
  }
};

const logout = async (req, res) => {
  // Destroy the session
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      res.status(500).json({message: "Internal server error"});
    } else {
      res.status(200).json({message: "Logout successful"});
    }
  });
};

const checkAuth = async (req, res) => {
  if (req.session['currentUser']) {
    res.status(200).json({authenticated: true, user: req.session['currentUser']});
  } else {
    res.status(401).json({authenticated: false});
  }
};

export {
  register,
  login,
  logout,
  checkAuth
};
