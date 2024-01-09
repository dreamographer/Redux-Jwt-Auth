import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from './routes/adminRoutes.js'
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import cors from 'cors'
dotenv.config();

const port = process.env.PORT || 5000;

connectDB();

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173", // replace with your client's origin
    credentials: true,
    exposedHeaders: ["set-cookie"],
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", express.static("Backend/uploads"));

  app.get("/", (req, res) => {
    res.send("API is running....");
  });
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
try {
  app.listen(port, () => console.log(`Server started on port ${port}`));
} catch (error) {
  console.log(error);
}
