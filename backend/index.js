import express from "express";
import connectDB from "./config/database.js";
import dotenv from "dotenv";
import userRoute from "./routes/userRoute.js";
import messageRoute from "./routes/messageRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

const corsOption = {
  origin: "http://localhost:5173", // Adjust this to your frontend's URL if different
  credentials: true,
};
app.use(cors(corsOption));

const PORT = process.env.PORT || 8090;

// Routes
app.use("/api/v1/user", userRoute); // User routes
app.use("/api/v1/message", messageRoute); // Message routes

// Start the server and connect to the database
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is listening on port ${PORT}`);
});
