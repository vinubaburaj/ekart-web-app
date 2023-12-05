import {model} from "mongoose";
import userSchema from "../schemas/userShema.js";

const User = model("users", userSchema);

export default User;
