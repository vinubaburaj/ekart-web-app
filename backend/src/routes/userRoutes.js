import express from "express";
import {
  getAllUsers,
  createUser,
  deleteUser,
} from "../controllers/userController.js";

const router = express.Router();

// Route to get all users (Read)
router.get("/", getAllUsers);

// Route to add a new user (Create)
router.post("/", createUser);

// Route to delete a user by ID (Delete)
router.delete("/:id", deleteUser);

export default router;
