// Imports
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./db/conn.mjs";
import globalErr from "./middleware/globalErr.mjs";
import userRoutes from './routes/userRoutes.mjs';
import gameRoutes from './routes/gameRoutes.mjs';
import cartRoutes from './routes/cartRoutes.mjs';

// Setups
connectDB();
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors()); // cross origin resource sharing
app.use(morgan("tiny"));
app.use(express.json());

// Routes
app.use('/api/user', userRoutes);
app.use('/api/game', gameRoutes);
app.use('/api/cart', cartRoutes);

// Err Middleware - only run when we have a server error
app.use(globalErr);

// listener
app.listen(PORT, () => {
  console.log(`Server running on Port: ${PORT}`);
});