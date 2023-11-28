import express from "express";
import { connect } from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import sessionMiddleware from "./middleware/sessionMiddleware.js";
import mongoose from "mongoose";

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(sessionMiddleware);

// MongoDB Connection
// connect("mongodb://localhost:27017/ekart", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
mongoose.connect("mongodb://127.0.0.1:27017/ekart");

// Routes
app.use("/auth", authRoutes);
app.use("/products", productRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
