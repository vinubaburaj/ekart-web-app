import {model} from "mongoose";
import productSchema from "../schemas/product.js";

const Product = model("Product", productSchema);

export default Product;