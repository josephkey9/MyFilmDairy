import express from "express";
import mongoose from "mongoose";
import Film from "../models/film.model.js";

export const getFilm = async (req,res)=>{
    try {
        const films = await Film.find({});
        res.status(200).json({success:true , data:films});

    } catch (error) {
        console.log("Filmler get edilirken problem oluştu:" , error.message);
    }
};

export const postFilm = async (req,res)=>{
   const { name, explain, rating } = req.body; 

     if(!name || !explain || rating === undefined || rating === null){
        return res.status(400).json({success:false , message:"Lütfen Tüm Alanları Doldurun."});
    }

    try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&query=${encodeURIComponent(name)}&language=tr-TR`
        );
        const data = await response.json();

        let posterUrl = "https://via.placeholder.com/300x450?text=No+Poster";

        if (data.results && data.results.length > 0 && data.results[0].poster_path) {
          posterUrl = `https://image.tmdb.org/t/p/w500${data.results[0].poster_path}`;
        }

        const newFilm = new Film({
            name,
            explain,
            rating,
            image: posterUrl
        });

        await newFilm.save();
        res.status(201).json({success:true , data : newFilm})
    } catch (error) {
        console.error('Error in create film ', error.message);
        res.status(500).json({success:false , message:"Server Hatası"})
    }
};

export const putFilm = async (req,res)=>{
    const {id} = req.params;
    const film = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false , message:"geçersiz Film id'si"});
    }

    try {
        const updatedFilm = await Film.findByIdAndUpdate(id , film , {new:true});
        res.status(200).json({success:true , data : updatedFilm})
    } catch (error) {
        res.status(500).json({success:false , message:"Server Hatası"});
    }

};


export const deleteFilm = async (req,res)=>{
    const {id}=req.params;

    try {
        await Film.findByIdAndDelete(id);
        res.status(200).json({success:true , message : "Film Başarıyla Silindi."})
    } catch (error) {
        console.error('Error:', error.message); 
}
};
