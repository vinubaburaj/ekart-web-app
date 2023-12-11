import { Schema } from "mongoose";

const userSchema = new Schema({
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
  wishlist: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    },
  ],
  role: {
    type: String,
    enum: ["BUYER", "SELLER", "ADMIN"],
    default: "BUYER",
  },
  prevSearch: String,
  orders: [
    {
      type: Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
});

export default userSchema;
