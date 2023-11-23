import express from "express";
import { connect, model } from "mongoose";
import pkg from 'body-parser';
import { hash, compare } from "bcrypt";
import cors from "cors";
const { json } = pkg;

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(json());

// MongoDB Connection
connect("mongodb://localhost:27017/ekart", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const User = model("User", {
  firstName: String,
  lastName: String,
  email: String,
  password: String,
});

// Routes
app.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password, confirmPassword } = req.body;

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords don't match" });
    }

    // Hash the password
    const hashedPassword = await hash(password, 10);

    // Save the user to the database
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/login", async (req, res) => {
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
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
