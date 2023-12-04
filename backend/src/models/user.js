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
    enum: ["USER", "SELLER", "ADMIN"],
    default: "USER",
  },
});

export default User;
