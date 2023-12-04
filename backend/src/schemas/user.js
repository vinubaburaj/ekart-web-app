import { Schema } from "mongoose";

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  cart: [],
  wishlist: [],
  role: {
    type: String,
    enum: ["USER", "SELLER", "ADMIN"],
    default: "USER",
  },
});

export default userSchema;
