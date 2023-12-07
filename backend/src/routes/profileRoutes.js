import express from "express";
import {
  getProfile,
  updateProfile,
  getReviewsByUser,
} from "../controllers/profileController.js";

const router = express.Router();

router.get("/:profileId", getProfile);
router.put("/:profileId", updateProfile);
router.get("/:profileId/reviews", getReviewsByUser);

export default router;
