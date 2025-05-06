import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
    title: {type: String, required: true},
    category: {
        type: String,
        required: true,
        enum: ["Board", "Card", "Tabletop", "Video", "Other"]},
    price: {type: Number, required: true},
    desc: {type: String },
    numofplayers: {type: Number},
    totalqty: {type: Number, min: 1, required: true},
})

export default mongoose.model("Games", gameSchema)