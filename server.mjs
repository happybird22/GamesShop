//Imports
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import connectDB from './db/conn.mjs'
import globalError from './middleware/globalErr.mjs';

//Setups
dotenv.config();
const PORT = process.env.PORT || 3001;
const app = express();

//Middleware
app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());

//Routes

//ErrorHandling Middleware
app.use(globalError)

//Listeners
app.listen(PORT, ()=> {
    console.log(`Server running on port: ${PORT}`)
});