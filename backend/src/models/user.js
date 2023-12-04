import {model} from "mongoose";

const User = model("User", {
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  cart: [],
  wishlist: [],
  role: {
    type: String,
    enum: ["BUYER", "SELLER", "ADMIN"],
    default: "BUYER",
  },
  mobile: String,
  address: String,
});

export default User;
