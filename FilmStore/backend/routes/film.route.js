import express from "express";
import mongoose from "mongoose";
import Film from '../models/film.model.js';
import { deleteFilm, getFilm, postFilm, putFilm } from "../controllers/film.controller.js";

const router = express.Router();

router.get("/" , getFilm );

router.post("/" , postFilm );

router.put("/:id" , putFilm );

router.delete("/:id" , deleteFilm);

export default router;