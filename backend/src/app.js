import express from "express";
import { connect } from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import sessionMiddleware from "./middleware/sessionMiddleware.js";

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(sessionMiddleware);

// MongoDB Connection
connect("mongodb://localhost:27017/ekart", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Routes
app.use("/auth", authRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
