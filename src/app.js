import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import blogRoutes from "./routes/blogRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { trimRequestBody } from "./middleware/trimRequestBody.js";

// To load values from .env file to process.env to read the env values
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // Middleware to parse JSON requests
app.use(trimRequestBody); // Middleware that trim all values provided inside request body

// Add Route for all CRUD APIs related to blogs
app.use("/api/blogs", blogRoutes);
// Add Route for User Registration and Login
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Blogs App REST API!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
