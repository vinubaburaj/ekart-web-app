import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import sessionMiddleware from "./middleware/sessionMiddleware.js";
import {MongoClient, ServerApiVersion} from "mongodb";
import wishlistRoutes from "./routes/wishlistRoutes.js";
import session from "express-session";

const PORT = process.env.PORT || 4000;
const DB_URL =
  process.env.DB_CONNECTION_STRING || "mongodb://localhost:27017/ekart";

mongoose.connect(DB_URL);

const client = new MongoClient(DB_URL, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("ekart").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

run().catch(console.dir);

const app = express();

// Middleware
app.use(
  cors({
    credentials: true,
    origin: [process.env.FRONTEND_URL, "http://localhost:3000"],
  })
);

const sessionOptions = {
  secret: "sessionSecretKeyABCDE",
  resave: false,
  saveUninitialized: false
};
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    secure: true,
    sameSite: "none"
  };
}

/*if (process.env.NODE_ENV === "production") {
  sessionMiddleware.proxy = true;
  sessionMiddleware.cookie = {
    secure: true,
    sameSite: "none",
  };
}*/

app.use(session(sessionOptions));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
