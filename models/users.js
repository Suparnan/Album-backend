import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    Firstname: {
        type: String,
        required: true,
    },
    Lastname: {
        type: String,
        required: true,
    },
    Phonenumber: {
        type: Number,
        required: true,
    },
},
    { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
