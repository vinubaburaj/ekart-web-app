import {model} from "mongoose";
import userSchema from "../schemas/userSchema.js";


const User = model("users", userSchema);


export default User;
