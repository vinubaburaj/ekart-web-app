import { Router } from "express";
const router = Router();
import { register, login } from "../controllers/authController.js";

// Register route
router.post("/register", register);

// Login route
router.post("/login", login);

// Logout route
router.get("/logout", (req, res) => {
  // Destroy the session
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    } else {
      res.status(200).json({ message: "Logout successful" });
    }
  });
});

// Check if the user is authenticated
router.get("/check-auth", (req, res) => {
  if (req.session.user) {
    res.status(200).json({ authenticated: true, user: req.session.user });
  } else {
    res.status(401).json({ authenticated: false });
  }
});

export default router;
