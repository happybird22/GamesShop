import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
    game: {type: mongoose.Schema.Types.ObjectId, ref: "Game", required: true},
    price: {type: Number, required: true},
    qty: {type: Number, default: 1, min: 1},
});

const cartSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    items: {cartItemSchema},
});

export default mongoose.model("Cart", cartSchema)