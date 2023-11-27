import { model } from "mongoose";

const User = model("User", {
  firstName: String,
  lastName: String,
  email: String,
  password: String,
});

export default User;
