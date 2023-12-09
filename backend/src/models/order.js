import { model } from "mongoose";
import orderSchema from "../schemas/orderSchema.js";

const Order = model("Order", orderSchema);

export default Order;
