import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    productId: {
      type: String,
      required: true,
    },
    review: String,
  },
  { collection: "reviews" }
);

export default reviewSchema;
