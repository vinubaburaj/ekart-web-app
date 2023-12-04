import { model } from "mongoose";
import userSchema from "../schemas/user.js";

const User = model("User", userSchema);

export default User;
