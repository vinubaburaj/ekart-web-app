import { Schema } from "mongoose";

const userSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    cart: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    wishlist: [],
    role: {
      type: String,
      enum: ["USER", "SELLER", "ADMIN"],
      default: "USER",
    },
  }
);

export default userSchema;
