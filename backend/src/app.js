import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import sessionMiddleware from "./middleware/sessionMiddleware.js";
import {MongoClient, ServerApiVersion} from "mongodb";

const PORT = process.env.PORT || 4000;
const DB_URL = "mongodb+srv://gibranmyageri:btRc5Zq5LCdvpVil@kanbas.jopnsgi.mongodb.net/ekart?retryWrites=true&w=majority"

mongoose.connect(DB_URL);

const client = new MongoClient(
    DB_URL,
    {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ping: 1});
    console.log(
        "Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

run().catch(console.dir);


const app = express();

// Middleware
app.use(cors({
  credentials: true,
  origin: [process.env.FRONTEND_URL, "http://localhost:3000"]
}));
app.use(bodyParser.json());

if (process.env.NODE_ENV !== "development") {
  sessionMiddleware.proxy = true;
  sessionMiddleware.cookie = {
    secure: true,
    sameSite: "none"
  };
}

app.use(sessionMiddleware);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
