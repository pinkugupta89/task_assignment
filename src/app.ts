import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import cityRoute from "./routes/city.routes";
import userRoutes from "./routes/user.routes";

dotenv.config();
//Database connection initiation
//connectDB();

// Initialize express from here.
const app = express();
//by default json data
app.use(express.json());
// APi Routes for controllers & modules
app.use("/api", cityRoute);
app.use("/api/user", userRoutes);
//---------- Routes End Here--------------------

export default app;
