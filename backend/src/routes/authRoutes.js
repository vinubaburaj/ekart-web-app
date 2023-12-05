import {Router} from "express";
import {
  checkAuth,
  login,
  logout,
  register
} from "../controllers/authController.js";

const router = Router();

// Register route
router.post("/register", register);

// Login route
router.post("/login", login);

// Logout route
router.get("/logout", logout);

// Check if the user is authenticated
router.get("/check-auth", checkAuth);

export default router;
