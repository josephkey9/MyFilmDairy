import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import Film from './models/film.model.js';
import mongoose from 'mongoose';

import filmRoutes from './routes/film.route.js';

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.use("/api", filmRoutes);



app.listen(3000 , ()=>{
    console.log("your server listing on http://localhost:3000/")
});


