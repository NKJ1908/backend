import mongoose from "mongoose";

const userschema = new mongoose.Schema({
    nom: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    }
},{timestamps: true}
)

const UserModel = mongoose.model("User", userschema)

export default UserModel;