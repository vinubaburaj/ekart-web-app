import { model } from "mongoose";
import userSchema from "../schemas/userSchema.js";

const User = model("User", userSchema);

export default User;
