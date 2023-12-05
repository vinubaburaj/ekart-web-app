import reviewSchema from "../schemas/reviewSchema.js";
import mongoose from "mongoose";

const reviewModel = mongoose.model("reviews", reviewSchema);
export default reviewModel;