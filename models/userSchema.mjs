import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {type: string, required: true, unique: true},
    email: {
        type: string, 
        required: true, 
        unique: true, 
        match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Email address must be valid !",
      ],
    },
    password: {type: string, required: true, minlength: 6},
    admin: {type: Boolean, default: false},
    cart: {type: mongoose.Schema.Types.ObjectId, ref: "Cart"}
});

export default mongoose.model('User', userSchema);