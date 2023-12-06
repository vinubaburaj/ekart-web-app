import { Schema } from "mongoose";

const productSchema = new Schema({
  title: String,
  description: String,
  price: Number,
  discountPercentage: Number,
  rating: Number,
  stock: Number,
  brand: String,
  category: String,
  thumbnail: String,
  images: [String],
  // dummy json product ID ranges from 1 - 100
  dummyId: Number,
});

export default productSchema;
