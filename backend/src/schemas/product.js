import {Schema} from "mongoose";

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
  // dummy json product ID ranges from 1 to 100 or id generated for new
  // product by seller
  id: {type: Number, required: true, unique: true},
  sellerId: {type: Schema.Types.ObjectId, ref: "User"},
});

export default productSchema;
