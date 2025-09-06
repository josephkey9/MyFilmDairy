import mongoose from "mongoose";

const filmSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    explain:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:false
    },
    rating: { 
        type: Number,
        min: 0,
        max: 5,
        default: 0
    } 
},{
    timestamps:true
});

const Film = mongoose.model('Film',filmSchema);
export default Film;
